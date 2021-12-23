import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Search} from '../../components';
import styles from './styles';
import {Card, ModalPr} from './components';
import {useStore} from '../../context';
import {dataMenu} from '../../actions/Data';
import {findBgLg, handleDataOdd} from '../../utils';

const SearchScreen = () => {
  const {
    searchProductsStore: {productsSearch, fetchProductsSearch},
  } = useStore();

  const [isVisible, setIsVisible] = useState(false);
  const [menu, setMenu] = useState(null);

  const onPressCard = item => {
    setMenu(item);
    fetchProductsSearch({group_type: item.id});
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <ScrollView bounces={false} style={styles.layout}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Discover\nNew Flavors'}</Text>
        <Search placeholder={'Search'} />
        {dataMenu &&
          dataMenu?.map((item, index) => {
            return (
              <Card
                key={index.toString()}
                item={item}
                index={index}
                bgLG={findBgLg(index)}
                onPressCard={onPressCard}
              />
            );
          })}
      </View>
      <ModalPr
        isVisible={isVisible}
        menu={menu}
        productsSearch={handleDataOdd(productsSearch)}
        goBack={handleCloseModal}
      />
    </ScrollView>
  );
};

export default observer(SearchScreen);
