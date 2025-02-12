import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { screenHeight } from '../../utils/Constants';
import { goBack } from '../../utils/NavigationUtil';
import ScalePress from '../ui/ScalePress';

const GameFooter = () => {
  return (
    <View style={styles.container}>
      <ScalePress onPress={() => goBack()}>
        <Image
          source={require('../../assets/icons/close.png')}
          style={styles.closeIcon}
        />
      </ScalePress>
    </View>
  );
};

export default GameFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: screenHeight * 0.1,
    paddingHorizontal: 10,
  },
  closeIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});
