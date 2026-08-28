export const shuffleWord = (word: string) => {
    const arr:string[] = word.split("");

    for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.join("");
}

export const safeShuffleWord = (word: string) => {
    let shuffled = word; 
    while(shuffled === word){
        shuffled = shuffleWord(word);
    };
    return shuffled;
}