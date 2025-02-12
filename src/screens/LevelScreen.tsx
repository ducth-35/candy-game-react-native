import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {commonStyles} from '../styles/commonStyles';
import {levelStyles} from '../styles/levelStyles';
import ScalePress from '../components/ui/ScalePress';
import {goBack, navigate} from '../utils/NavigationUtil';
import {gameLevels} from '../utils/data';
import {useLevelStore} from '../hooks/useLevelStore';

const LevelScreen: FC = () => {
  const {levels} = useLevelStore();

  const handleLevelPress = (item: Level) => {
    if (!item?.unlocked) return;
    const levelKey = `level${item?.id}` as keyof GameLevels;
    const level = gameLevels[levelKey];
    navigate('GameScreen', {
      level: {...level, id: item?.id},
    });
  };

  const renderItem: ListRenderItem<Level> = ({item}) => {
    const opacity = item?.unlocked ? 1 : 0.5;
    const emoji = item?.completed ? '✅' : item?.unlocked ? '🍬' : '🔒';

    return (
      <ScalePress
        style={levelStyles.levelItem}
        onPress={() => handleLevelPress(item)}
        disabled={!item?.unlocked}>
        <View style={{opacity}}>
          <Text style={levelStyles.levelText}>{emoji}</Text>
          <Text style={levelStyles.levelText}>Level {item?.id}</Text>
          {item?.highScore > 0 && (
            <Text style={levelStyles.levelText}>HS: {item?.highScore}</Text>
          )}
        </View>
      </ScalePress>
    );
  };

  const renderListFooter = () => {
    return (
      <View style={levelStyles.comingSoonContainer}>
        <Image
          source={require('../assets/images/doddle.png')}
          style={levelStyles.doddle}
        />
        <Text style={levelStyles.comingSoonText}>Coming Soon!</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/forest.jpeg')}
      style={commonStyles.container}>
      <SafeAreaView />
      <View style={levelStyles.flex1}>
        <ScalePress onPress={() => goBack()}>
          <Image
            source={require('../assets/icons/back.png')}
            style={levelStyles.backIcon}
          />
        </ScalePress>

        <ImageBackground
          source={require('../assets/images/lines.jpg')}
          style={levelStyles.levelContainer}>
          <View style={levelStyles.subLevelContainer}>
            <FlatList
              data={levels}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={levelStyles.columnWrapper}
              ListFooterComponent={renderListFooter}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
            />
          </View>
        </ImageBackground>

        <View style={levelStyles.flex2}>
          <Text style={levelStyles.text}>
            Rule: Collect the mininum amout of candy before time runs out!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LevelScreen;

const styles = StyleSheet.create({});
