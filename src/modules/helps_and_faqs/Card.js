import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Button, Text} from '@components';
import {scale} from '@resolutions';
import {colors, radius} from '@constant';

const Card = ({data}) => {
  const [isShowAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Button style={styles.btnQuestion} onPress={handleShowAnswer}>
        <Text bold={isShowAnswer} style={styles.txtQuestion}>
          {data?.question || ''}
        </Text>
        <Ionicons
          size={scale(22)}
          name="chevron-down"
          color={isShowAnswer ? colors.black : colors.gray_9796A1}
        />
      </Button>
      {isShowAnswer && (
        <Text style={styles.txtAnswer}>{data?.answer || ''}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray_EEEEEE,
    borderWidth: 1,
    borderRadius: radius.radius10,
    padding: 0,
    paddingLeft: scale(20),
    paddingRight: scale(10),
    paddingVertical: scale(15),
    justifyContent: 'center',
    marginBottom: scale(15),
  },
  btnQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtQuestion: {
    width: '92%',
  },
  txtAnswer: {
    marginTop: scale(10),
    textAlign: 'justify',
  },
});

export default Card;
