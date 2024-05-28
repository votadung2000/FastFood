import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {observer} from 'mobx-react';
import Entypo from 'react-native-vector-icons/Entypo';

import {scale, wScale} from '@resolutions';
import {POPUP_MENU, colors, radius} from '@constant';
import {useStore} from '@context';

import Text from './Text';
import Notifer from './Notifer';
import ModalLoading from './Modals/ModalLoading';

const {width} = Dimensions.get('screen');

const WITH_MENU = Math.floor(width / 3);

const ItemCard = ({data, onSelect}) => {
  return (
    <MenuOption onSelect={() => onSelect(data)} style={styles.btnMenu}>
      {data?.Icon && <View style={styles.vwIcon}>{data?.Icon}</View>}
      <Text style={styles.txtNameMenu}>{data?.name || ''}</Text>
    </MenuOption>
  );
};

const PopupMenu = ({dataMenu, onSelectMenu}) => {
  const {} = useStore();

  const [loading, setLoading] = useState({isVisible: false});

  const checkDeleted = () => {
    try {
      setLoading({isVisible: true});
    } catch ({response}) {
      setLoading({isVisible: false});
      if (!response) {
        Notifer({
          alertType: 'warn',
          title: 'Please check your network connection',
        });
      } else {
        Notifer({
          alertType: 'error',
          title: response?.data?.message || '',
        });
      }
    }
  };

  const onSelect = item => {
    if (onSelectMenu) {
      onSelectMenu(item);
    } else {
      switch (item?.id) {
        case POPUP_MENU?.DELETE?.id:
          checkDeleted();
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger style={styles.btnDots}>
          <Entypo
            name="dots-two-horizontal"
            size={scale(19)}
            color={colors.gray_C4C4C4}
          />
        </MenuTrigger>
        <MenuOptions>
          <View style={styles.vwMenu}>
            {dataMenu?.map(item => {
              return (
                <ItemCard key={item?.id} data={item} onSelect={onSelect} />
              );
            })}
          </View>
        </MenuOptions>
      </Menu>
      <ModalLoading {...loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDots: {
    paddingLeft: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwMenu: {
    width: WITH_MENU,
    position: 'absolute',
    top: scale(15),
    right: scale(15),
    padding: scale(5),
    backgroundColor: colors.white,
    borderRadius: radius.radius4,
    zIndex: 9999,
    ...radius.shadow,
  },
  btnMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vwIcon: {
    width: wScale(28),
    height: wScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNameMenu: {
    flex: 1,
    marginLeft: scale(5),
    color: colors.gray_9796A1,
  },
});

export default observer(PopupMenu);
