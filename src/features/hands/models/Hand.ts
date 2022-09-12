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
  };
  handImage?: string;
  handImageBackup?: string;
  id?: string;
  owner?: string;
}

export interface GetHands extends HandData {
  userHands: HandData[];
}

export interface FormHand {
  handName: string;
  heroPosition: number;
  villainPosition: number;
  heroStack: number;
  villainStack: number;
  heroCard1: string;
  heroCard2: string;
  villainCard1: string;
  villainCard2: string;
  preFlopActions: string;
  preFlopPot: number;
  flopCard1: string;
  flopCard2: string;
  flopCard3: string;
  flopActions: string;
  flopPot: number;
  turnCard: string;
  turnActions: string;
  turnPot: number;
  riverCard: string;
  riverActions: string;
  riverPot: number;
  gameWinner: string;
  handDescription: string;
  handImage: string;
}
