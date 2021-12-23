import React from 'react';
import {View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Search} from '../../components';
import styles from './styles';
import {Card} from './components';
// import {useStore} from '../../context';
import {dataMenu} from '../../actions/Data';
import {findBgLg} from '../../utils';

const SearchScreen = () => {
  return (
    <ScrollView bounces={false} style={styles.layout}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Discover\nNew Flavors'}</Text>
        <Search placeholder={'Search'} />
        {dataMenu &&
          dataMenu?.map((item, index) => {
            return <Card data={item} index={index} bgLG={findBgLg(index)} />;
          })}
      </View>
    </ScrollView>
  );
};

export default observer(SearchScreen);
