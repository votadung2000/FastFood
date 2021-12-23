import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button} from '../../../components';
import {colors, fontSize} from '../../../constant';
import {Layout} from '../../../views';
import {scale} from '../../../utils/resolutions';
import Products from './Products';

const ModalPr = ({isVisible, menu, productsSearch, goBack}) => {
  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}>
      <Layout>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button onPress={goBack} style={styles.btnBack}>
              <Ionicons name="chevron-back-outline" size={scale(28)} />
            </Button>
            <Text style={styles.title}>{`Popular ${menu?.title}`}</Text>
          </View>
          <Products imgMenu={menu?.img} data={productsSearch} />
        </View>
      </Layout>
    </Modal>
  );
};

export default ModalPr;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: fontSize.fontSize28,
    lineHeight: scale(35),
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  btnBack: {
    paddingRight: scale(10),
  },
});
