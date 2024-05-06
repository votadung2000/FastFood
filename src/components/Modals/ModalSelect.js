import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {colors, fontSize, radius} from '@constant';
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
        {item?.Icon && <View style={styles.vwIcon}>{item?.Icon}</View>}
        <Text medium style={[isSelect && styles.txtBtnSelect, stName]}>
          {item[labelValue] || ''}
        </Text>
      </Button>
    );
  };

  return (
    <Modal stModal={styles.stModal} {...rest}>
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
  stModal: {
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    maxHeight: '70%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderTopStartRadius: radius.radius20,
    borderTopEndRadius: radius.radius20,
  },
  title: {
    fontSize: fontSize.large,
    textAlign: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  stFL: {},
  btn: {
    width: '70%',
    marginBottom: scale(20),
    paddingBottom: scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray_C4C4C4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  vwIcon: {
    marginRight: scale(20),
  },
  txtBtnSelect: {
    color: colors.orange_FE724C,
  },
});

export default ModalSelect;
