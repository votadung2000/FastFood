import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import Config from 'react-native-config';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {resolutions, limitedString} from '@utils';
import {useStore} from '@context';

const {scale} = resolutions;

const CardMenu = ({data}) => {
  const {
    productsStore: {filterPr, fetchApiListProducts},
  } = useStore();

  const handleItem = () => {
    if (filterPr?.category_id?.id !== data?.id) {
      fetchApiListProducts({category_id: data});
    }
  };

  return (
    <Button
      onPress={() => handleItem()}
      style={[
        styles.container,
        data?.id === filterPr?.category_id?.id
          ? styles.upShadow
          : styles.shadow,
      ]}>
      <FastImage
        source={{
          uri: data?.image?.url ? Config.API_IMAGE + data?.image?.url : '',
        }}
        style={styles.imgMenu}
      />
      <Text bold style={styles.txtItem}>
        {limitedString(data?.name, 6) || ''}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: radius.radius10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(10),
    backgroundColor: colors.white,
  },
  imgMenu: {
    width: scale(42),
    height: scale(42),
    borderRadius: radius.radius10,
    marginBottom: scale(8),
  },
  txtItem: {
    fontSize: fontSize.smaller,
  },
  upShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default observer(CardMenu);
