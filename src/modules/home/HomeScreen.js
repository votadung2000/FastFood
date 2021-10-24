import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

import {Layout} from '../../views';
import {Text, Button} from '../../components';
import styles from './styles';
import {dataMenu} from '../../actions/Data';
import {limitedString} from '../../utils';
import {Products} from './components';

const HomeScreen = () => {
  const [itemMenu, setItemMenu] = useState(dataMenu[0]);

  const keyExtractor = (_, index) => index.toString();

  const handleItem = item => {
    setItemMenu(item);
  };

  const renderItem = ({item}) => {
    return (
      <Button
        onPress={() => handleItem(item)}
        style={[
          styles.item,
          {shadowOpacity: item.id === itemMenu.id ? 0.3 : 0.1},
        ]}>
        <FastImage source={{uri: item.img}} style={styles.imgMenu} />
        <Text bold style={styles.txtItem}>
          {limitedString(item.title)}
        </Text>
      </Button>
    );
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign name="menu-fold" size={26} />
          <AntDesign name="search1" size={26} />
        </View>
        <Text bold style={styles.title}>
          {'Find Your\nDelicious Food'}
        </Text>
        <View style={styles.menu}>
          <FlatList
            data={dataMenu}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Products title={itemMenu.title} />
        </View>
      </View>
    </Layout>
  );
};

export default HomeScreen;
