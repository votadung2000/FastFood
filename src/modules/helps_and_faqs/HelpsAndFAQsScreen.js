import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react';

import {Back, EmptyComponent, LoadingComponent} from '@components';
import {colors} from '@constant';
import {scale} from '@resolutions';
import {useStore} from '@context';

import Card from './Card';

const HelpsAndFAQsScreen = () => {
  const {
    faqStore: {faqs, isLoadingFAQs, fetchApiListFAQ},
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      fetchApiListFAQ();
    }, []),
  );

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <Card data={item} />;
  };

  return (
    <View style={styles.container}>
      <Back title={'FAQs'} />
      <View style={styles.content}>
        <FlatList
          data={faqs?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={styles.ccSt}
          ListHeaderComponent={isLoadingFAQs && <LoadingComponent />}
          ListFooterComponent={isLoadingFAQs && <LoadingComponent />}
          ListEmptyComponent={
            !isLoadingFAQs && <EmptyComponent title="FAQ's Empty" />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: scale(25),
    marginTop: scale(30),
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(80),
  },
});

export default observer(HelpsAndFAQsScreen);
