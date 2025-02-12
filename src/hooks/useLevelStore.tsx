import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmksStorage } from '../state/storage';
import { initialLevelData } from '../utils/data';

export const useLevelStore = create<LevelStore>()(
  persist(
    (set,get) => ({
      levels: initialLevelData,
      unlockLevel: (id: number) => {
        set((state) => {
          const updateLevels = state.levels.map(level => 
            level.id === id ? {...level, unlocked: true} : level
          )

          return {levels: updateLevels}
        })
      },
      compeleteLevel: (id: number, collectedCandies: number) => {
        set(state => {
          const updateLevels = state.levels.map(level => 
            level.id === id ? {...level, completed: true, highScore: Math.max(level.highScore, collectedCandies)} : level
          )

          return { levels: updateLevels }
        })
      }
    }),
    {
      name: 'level-storage',
      storage: createJSONStorage(() => mmksStorage)
    }
  )
)