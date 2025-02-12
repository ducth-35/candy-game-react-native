import {useRoute} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {ImageBackground} from 'react-native';
import GameFooter from '../components/game/game-footer';
import GameHeader from '../components/game/game-header';
import GameTitle from '../components/game/game-title';
import {commonStyles} from '../styles/commonStyles';
import {useCountdown} from '../hooks/useCountDown';

const GameScreen: FC = () => {
  const route = useRoute();
  const item = route?.params as any;

  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  const {timeLeft} = useCountdown(
    item?.level?.id,
    item?.level?.time,
    item?.level?.pass,
    collectedCandies,
  );

  useEffect(() => {
    if (item?.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
    }
  }, []);

  return (
    <ImageBackground
      style={commonStyles.simpleContainer}
      source={require('../assets/images/b1.png')}>
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={timeLeft}
      />

      {gridData && (
        <GameTitle
          data={gridData}
          setData={setGridData}
          setCollectedCandies={setCollectedCandies}
        />
      )}
      <GameFooter />
    </ImageBackground>
  );
};

export default GameScreen;
