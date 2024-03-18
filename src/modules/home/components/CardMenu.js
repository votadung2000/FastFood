import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {resolutions, limitedString} from '@utils';
import {useStore} from '@context';
import {hScale, wScale} from '@resolutions';

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
    <Button onPress={() => handleItem()} style={styles.container}>
      <View style={styles.vwImg}>
        <FastImage
          isPath
          source={{uri: data?.image?.url}}
          style={styles.imgMenu}
        />
      </View>
      <Text medium style={styles.txtItem}>
        {limitedString(data?.name, 6) || ''}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wScale(60),
    height: hScale(90),
    borderRadius: scale(30),
    margin: scale(2),
    marginRight: scale(15),
    alignItems: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  vwImg: {
    width: wScale(50),
    height: wScale(50),
    borderRadius: scale(50),
    marginTop: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
    shadowColor: colors.gray_D3D1D8,
  },
  imgMenu: {
    width: wScale(28),
    height: wScale(28),
  },
  txtItem: {
    marginTop: scale(6),
    fontSize: fontSize.smaller,
    color: colors.gray_67666D,
  },
});

export default observer(CardMenu);
