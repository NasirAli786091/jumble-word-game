import { prisma } from "./prisma/prisma";

export async function getUserById(userId: string){
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            gamesPlayed: true,
            gamesWon: true,
        }
    })
}

export async function updateGameStats(
    player1Id: string,
    player2Id: string,
    winnerId: string | null,
){
    const updates = [
        prisma.user.update({
            where: {
                id: player1Id,
            },
            data: {
                gamesPlayed: {
                    increment: 1,
                },
                ...(winnerId === player1Id && {
                    gamesWon: {
                        increment: 1,
                    },
                }),
            },
        }),
        prisma.user.update({
            where: {
                id: player2Id,
            },
            data: {
                gamesPlayed: {
                    increment: 1,
                },
                ...(winnerId === player2Id && {
                    gamesWon: {
                        increment: 1,
                    },
                }),
            },
        })
    ];
    await prisma.$transaction(updates);
}