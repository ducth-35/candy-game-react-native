type LevelGird = (number | null)[][];

interface GameLevels {
  [key: string]: {
    grid: LevelGird;
    pass: number;
    time: number;
  };
}

interface Level {
  id: number;
  unlocked: boolean;
  completed: boolean;
  highScore: number;
}

interface LevelStore {
  levels: Level[];
  unlockLevel: (id: number) => void;
  compeleteLevel: (id: number, collectedCandies: number) => void;
}
