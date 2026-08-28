import { Socket } from "socket.io";

export const onlineUsers = new Map<string, string>();

export const matchmakingQueue: Socket[] = [];

export const playerRooms = new Map<string, string>(); // userId → roomId

export const roomData = new Map<
  string,
  {
    answer: string,
    scrambleWord: string,
    defination: string,
    partOfSpeech: string,
    scores: Record<string, number>,
    round: number,
    maxRound: number,
  }
>();

export const disconnectedPlayers = new Map<
  string,
  NodeJS.Timeout
>();