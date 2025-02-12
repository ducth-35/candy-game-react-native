import {useState, useEffect} from 'react';
import {goBack} from '../utils/NavigationUtil';
import {useLevelStore} from './useLevelStore';

export const useCountdown = (
  id: number,
  time: number,
  totalCount: number,
  collectedCandies: number,
) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const {compeleteLevel, unlockLevel} = useLevelStore();

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const onComplete = () => {
    if (collectedCandies >= totalCount) {
      compeleteLevel(id, collectedCandies);
      unlockLevel(id);
    }
    goBack();
  };

  return {timeLeft};
};
