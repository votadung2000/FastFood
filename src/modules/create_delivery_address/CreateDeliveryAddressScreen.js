import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Input,
  Text,
  Button,
  Back,
  Location,
  ModalLoading,
  Notifer,
  SelectType,
  SelectDefault,
} from '@components';
import {
  DATA_TYPE_DELIVERY_ADDRESS,
  DEFAULT_DELIVERY_ADDRESS,
  colors,
  fontSize,
} from '@constant';
import {hScale, scale} from '@resolutions';
import {useStore} from '@context';

const initialValues = {
  recipient_name: '',
  phone_number: '',
  street_address: '',
  city: '',
  country: '',
  postal_code: '',
  type: '',
  default: DEFAULT_DELIVERY_ADDRESS.NOT_DEFAULT,
};

const initialErrors = {
  recipient_name: true,
  phone_number: true,
  street_address: true,
  city: true,
  country: true,
  postal_code: true,
};

import CreateDeliveryAddressSchema from './CreateDeliveryAddressSchema';

const CreateDeliveryAddressScreen = () => {
  const navigation = useNavigation();

  const {
    locationStore: {
      fetchApiLocationWithGeolocation,
      fetchApiLocationWithAddress,
    },
  } = useStore();

  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    isValid,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: CreateDeliveryAddressSchema,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = () => {};

  const handleAutoGetLocation = async () => {
    try {
      setLoading({isVisible: true});

      let response = await fetchApiLocationWithGeolocation();

      if (response) {
        let dataAddress = [];

        if (response?.address?.house_number) {
          dataAddress.push(response?.address?.house_number);
        }

        if (response?.address?.road) {
          dataAddress.push(response?.address?.road);
        }

        if (response?.address?.quarter) {
          dataAddress.push(response?.address?.quarter);
        }

        if (response?.address?.suburb) {
          dataAddress.push(response?.address?.suburb);
        }

        setFieldValue('street_address', dataAddress?.join(', '));
        setFieldValue('city', response?.address?.city);
        setFieldValue('country', response?.address?.country);
        setFieldValue('postal_code', response?.address?.postcode);

        setLoading({isVisible: false});
      }
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

  const handleAutoWithAddress = async () => {
    try {
      setLoading({isVisible: true});

      let body = {
        address: values.street_address,
      };

      let response = await fetchApiLocationWithAddress(body);

      if (response?.length > 0) {
        let dataAddress = [];

        if (response[0]?.address?.house_number) {
          dataAddress.push(response[0]?.address?.house_number);
        }

        if (response[0]?.address?.road) {
          dataAddress.push(response[0]?.address?.road);
        }

        if (response[0]?.address?.quarter) {
          dataAddress.push(response[0]?.address?.quarter);
        }

        if (response[0]?.address?.suburb) {
          dataAddress.push(response[0]?.address?.suburb);
        }

        setFieldValue('street_address', dataAddress?.join(', '));
        setFieldValue('city', response[0]?.address?.city);
        setFieldValue('country', response[0]?.address?.country);
        setFieldValue('postal_code', response[0]?.address?.postcode);

        setLoading({isVisible: false});
      }
    } catch ({response}) {
      setLoading({isVisible: false});
      if (!response?.data?.error) {
        Notifer({
          alertType: 'warn',
          title: 'Please check your network connection',
        });
      } else {
        Notifer({
          alertType: 'error',
          title: response?.data?.error?.message || '',
        });
      }
    }
  };

  const handleCancelLocation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={false}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Back title={'Create Delivery Address'} />
        <View style={styles.content}>
          <View>
            <Text medium style={styles.title}>
              {'Contact'}
            </Text>
            <Input
              medium
              name="recipient_name"
              placeholder="Recipient name"
              value={values.recipient_name}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              name="phone_number"
              placeholder="Phone number"
              value={values.phone_number}
              keyboardType="number-pad"
              style={styles.input}
              {...{errors, touched, handleBlur, handleChange}}
            />
          </View>
          <View style={styles.vwBoxForm}>
            <View style={styles.vwBoxFormHeader}>
              <Text medium style={styles.titleDeliveryAddress}>
                {'Delivery Address'}
              </Text>
              <Button style={styles.btnAuto} onPress={handleAutoGetLocation}>
                <Text medium style={styles.txtAuto}>
                  {'Auto'}
                </Text>
              </Button>
            </View>
            <Input
              medium
              name="street_address"
              placeholder="Street address"
              value={values.street_address}
              inputStyle={styles.inputStyleStreetAddress}
              Icon={
                values.street_address?.length > 0 && (
                  <Button
                    style={styles.btnSync}
                    onPress={handleAutoWithAddress}>
                    <Entypo
                      name="cycle"
                      size={scale(22)}
                      color={colors.orange_FE724C}
                    />
                  </Button>
                )
              }
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              name="city"
              placeholder="City"
              value={values.city}
              style={styles.input}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <View style={styles.vwHorizontal}>
              <Input
                medium
                name="country"
                placeholder="Country"
                value={values.country}
                style={styles.inputCountry}
                {...{errors, touched, handleBlur, handleChange}}
              />
              <Input
                medium
                name="postal_code"
                placeholder="Postal code"
                value={values.postal_code}
                style={styles.inputPostalCode}
                {...{errors, touched, handleBlur, handleChange}}
              />
            </View>
          </View>
          <View style={styles.vwBoxForm}>
            <Text medium style={styles.title}>
              {'Setting'}
            </Text>
            <SelectType
              name="type"
              value={values.type}
              data={DATA_TYPE_DELIVERY_ADDRESS}
              {...{setFieldValue}}
            />
            <SelectDefault
              name="default"
              value={values.default}
              stContainer={styles.stSelectDefault}
              {...{setFieldValue}}
            />
          </View>
          <Button
            disabled={!isValid}
            style={styles.btnComplete}
            onPress={handleSubmit}>
            <Text bold style={styles.txtComplete}>
              {'COMPLETE'}
            </Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <Location handleCancelLocation={handleCancelLocation} />
      <ModalLoading {...loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingBottom: scale(50),
  },
  content: {
    flex: 1,
    marginTop: scale(25),
    paddingHorizontal: scale(25),
  },
  vwBoxForm: {
    marginTop: scale(20),
  },
  vwBoxFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  title: {
    color: colors.gray_9796A1,
    marginBottom: scale(10),
  },
  titleDeliveryAddress: {
    color: colors.gray_9796A1,
  },
  btnAuto: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: colors.orange_FE724C,
  },
  txtAuto: {
    color: colors.orange_FE724C,
  },
  inputStyleStreetAddress: {
    paddingRight: scale(45),
  },
  btnSync: {
    position: 'absolute',
    right: scale(5),
    paddingHorizontal: scale(5),
    zIndex: 9999,
  },
  vwHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginTop: scale(20),
  },
  inputCountry: {
    width: '60%',
    marginTop: scale(20),
  },
  inputPostalCode: {
    width: '38%',
    marginTop: scale(20),
  },
  stSelectDefault: {
    marginTop: scale(20),
  },
  btnComplete: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    marginTop: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FD724C,
    paddingVertical: scale(14),
  },
  txtComplete: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
});

export default observer(CreateDeliveryAddressScreen);
