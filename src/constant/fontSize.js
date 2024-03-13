import {Dimensions} from 'react-native';
import {RFValue} from '@resolutions';

const {height} = Dimensions.get('window');

const STANDARD_SCREEN_HEIGHT = height;

export const tiny = RFValue(9, STANDARD_SCREEN_HEIGHT);
export const smaller = RFValue(11, STANDARD_SCREEN_HEIGHT);
export const small = RFValue(12, STANDARD_SCREEN_HEIGHT);
export const fontSize14 = RFValue(14, STANDARD_SCREEN_HEIGHT);
export const normal = RFValue(15, STANDARD_SCREEN_HEIGHT);
export const fontSize16 = RFValue(16, STANDARD_SCREEN_HEIGHT);
export const large = RFValue(18, STANDARD_SCREEN_HEIGHT);
export const big = RFValue(20, STANDARD_SCREEN_HEIGHT);
export const huge = RFValue(24, STANDARD_SCREEN_HEIGHT);
export const fontSize28 = RFValue(28, STANDARD_SCREEN_HEIGHT);
export const fontSize34 = RFValue(34, STANDARD_SCREEN_HEIGHT);
export const fontSize46 = RFValue(46, STANDARD_SCREEN_HEIGHT);
export const hugest = RFValue(56, STANDARD_SCREEN_HEIGHT);
