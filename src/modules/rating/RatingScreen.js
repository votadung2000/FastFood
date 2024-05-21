import React, {useState} from 'react';
import {StyleSheet, View, ImageBackground, Image, Platform} from 'react-native';
import {observer} from 'mobx-react';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';

import {Button, Back, Input, Stars, Text} from '@components';
import {colors, findStatusOrder, fontSize, radius} from '@constant';
import {hScale, scale, wScale} from '@resolutions';
import {useStore} from '@context';

let appName = DeviceInfo.getApplicationName();

const initialValues = {
  content_review: '',
};

const initialErrors = {
  content_review: true,
};

let RatingSchema = object().shape({
  content_review: string().trim().required('Please enter information'),
});

const RatingScreen = () => {
  const {
    orderStore: {rating},
  } = useStore();

  const [stars, setStars] = useState(0);

  const {
    values,
    errors,
    isValid,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: RatingSchema,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = () => {
    resetForm();
  };

  const handleChangeStars = val => {
    setStars(val);
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.awareScroll}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardOpeningTime={0}
      extraHeight={hScale(170)}
      extraScrollHeight={Platform.OS === 'android' ? hScale(170) : 0}>
      <View style={styles.container}>
        <Back style={styles.containerBack} />
        <View style={styles.vwImgBg}>
          <ImageBackground
            source={require('@images/avatar_brand.png')}
            resizeMode="stretch"
            style={styles.brand}
            imageStyle={styles.imgBgSt}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.vwBrand}>
            <View style={styles.vwBRLogoBrand}>
              <View style={styles.vwLogoBrand}>
                <Image
                  source={require('@images/logo.png')}
                  style={styles.imgLogoBrand}
                />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <Text bold style={styles.nameBrand}>
              {appName}
            </Text>
            <Text style={styles.addressBrand}>
              {'4102  Pretty View Lanenda'}
            </Text>
            <View style={styles.vwStatus}>
              <View
                style={[
                  styles.dotStatus,
                  {
                    backgroundColor: findStatusOrder(rating?.status)?.color,
                  },
                ]}
              />
              <Text
                medium
                style={[
                  styles.txtStatus,
                  {
                    color: findStatusOrder(rating?.status)?.color,
                  },
                ]}>
                {`${rating?.id || ''} - ${
                  findStatusOrder(rating?.status)?.name || ''
                }`}
              </Text>
            </View>
            <Text bold style={styles.title}>
              {'Please Rate Delivery Service'}
            </Text>
            <View style={styles.vwStars}>
              <Stars stars={stars} handleChangeStars={handleChangeStars} />
            </View>
            <View style={styles.vwReviewRating}>
              <Input
                medium
                multiline={true}
                name="content_review"
                placeholder="Write Review"
                value={values.content_review}
                inputStyle={styles.inputStyle}
                {...{errors, touched, handleBlur, handleChange}}
              />
            </View>
            <Button
              disabled={!isValid}
              style={styles.btnAction}
              onPress={handleSubmit}>
              <Text medium style={styles.txtAction}>
                {'SUBMIT'}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: scale(150),
  },
  awareScroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerBack: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  vwImgBg: {
    width: '100%',
    height: hScale(150),
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(20),
  },
  brand: {
    width: '100%',
    height: '100%',
  },
  imgBgSt: {
    borderRadius: radius.radius14,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(25),
  },
  vwBrand: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -scale(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwBRLogoBrand: {
    width: wScale(110),
    height: wScale(110),
    borderRadius: scale(110),
    zIndex: 9999,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwLogoBrand: {
    width: wScale(82),
    height: wScale(82),
    padding: scale(1),
    backgroundColor: colors.white,
    borderRadius: scale(82),
    ...radius.shadow,
  },
  imgLogoBrand: {
    width: '100%',
    height: '100%',
    borderRadius: scale(82),
  },
  content: {
    flex: 1,
    marginTop: scale(65),
  },
  nameBrand: {
    textAlign: 'center',
    fontSize: fontSize.big,
  },
  addressBrand: {
    textAlign: 'center',
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
    marginTop: scale(8),
  },
  vwStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(8),
  },
  dotStatus: {
    width: wScale(6),
    height: wScale(6),
    borderRadius: scale(6),
    marginRight: scale(4),
    backgroundColor: colors.green_4EE476,
  },
  txtStatus: {
    fontSize: fontSize.small,
    color: colors.green_4EE476,
  },
  title: {
    textAlign: 'center',
    marginTop: scale(20),
    fontSize: fontSize.big,
  },
  vwStars: {
    marginTop: scale(30),
  },
  vwReviewRating: {
    marginTop: scale(30),
  },
  inputStyle: {
    height: hScale(170),
    textAlign: 'justify',
    textAlignVertical: 'top',
    paddingTop: scale(15),
    paddingBottom: scale(15),
  },
  btnAction: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    marginTop: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtAction: {
    color: colors.white,
  },
});

export default observer(RatingScreen);
