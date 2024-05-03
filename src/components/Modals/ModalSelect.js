import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {colors, radius} from '@constant';
import {scale} from '@resolutions';

import Modal from './Modal';
import Text from '../Text';
import Button from '../Buttons/Button';
import Loading from '../Loading';

const ModalSelect = ({
  value,
  title,
  data,
  stName,
  labelValue,
  onSelect,
  ...rest
}) => {
  const keyExtractor = (_, index) => index?.toString();

  const renderItem = ({item}) => {
    const isSelect = value?.id === item?.id;
    return (
      <Button key={item?.id} style={styles.btn} onPress={() => onSelect(item)}>
        <Text style={[styles.txtBtn, isSelect && styles.txtBtnSelect, stName]}>
          {item[labelValue] || ''}
        </Text>
      </Button>
    );
  };

  return (
    <Modal {...rest}>
      <View style={styles.container}>
        {title && (
          <Text bold style={styles.title}>
            {title}
          </Text>
        )}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.stFL}
          ListEmptyComponent={<Loading />}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '70%',
    maxHeight: '70%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: radius.radius6,
  },
  title: {
    textAlign: 'center',
    marginBottom: scale(20),
  },
  stFL: {},
  btn: {
    marginBottom: scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray_616772,
  },
  txtBtn: {
    color: colors.gray_9796A1,
  },
  txtBtnSelect: {
    color: colors.orange_FE724C,
  },
});

export default ModalSelect;
