export interface HandData {
  handName: string;
  preGame: {
    hero: {
      position: number;
      initialStack: number;
      hand: string[];
    };
    villains: [
      {
        position: number;
        initialStack: number;
        hand: string[];
      }
    ];
  };
  game: {
    preFlop: {
      pot: number;
      actions: string[];
    };
    flop?: {
      board: string[];
      pot: number;
      actions: string[];
    };
    turn?: {
      board: string;
      pot: number;
      actions: string[];
    };
    river?: {
      board: string;
      pot: number;
      actions: string[];
    };
  };
  postGame: {
    finalPot: number;
    gameWinner: string;
    handDescription?: string;
    handImage?: string;
  };
  id: string;
}
