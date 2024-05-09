import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import debounce from 'lodash/debounce';

import {Search, Back} from '@components';
import {useStore} from '@context';

import {Products} from './components';
import styles from './styles';

const DetailCardSearch = ({navigation}) => {
  const [txtSearch, setTxtSearch] = useState(null);

  const {
    productsStore: {filterPr, fetchApiListProducts, clearFilterPr},
  } = useStore();

  const handleGoBack = () => {
    clearFilterPr();
    navigation.goBack();
  };

  const handleFetchSearch = useCallback(
    debounce(text => {
      fetchApiListProducts({name: text});
    }, 400),
    [],
  );

  const onChangeText = text => {
    setTxtSearch(text);
    handleFetchSearch(text);
  };

  return (
    <View style={styles.container}>
      <Back
        title={`Popular ${filterPr?.category_id?.name || ''}`}
        handleGoBack={handleGoBack}
      />
      <View style={styles.content}>
        <Search
          value={txtSearch}
          placeholder={'Search'}
          onChangeText={onChangeText}
        />
        <Products />
      </View>
    </View>
  );
};

export default observer(DetailCardSearch);
