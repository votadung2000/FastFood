import {object, string} from 'yup';

let EditProfileSchema = object().shape({
  name: string().trim().required('Please enter name'),
  user_name: string().trim().required('Please enter username'),
  phone_number: string()
    .trim()
    .min(10, 'Incorrect phone number!')
    .max(10, 'Incorrect phone number!')
    .required('Please enter phone number'),
  email: string()
    .trim()
    .email('Incorrect email')
    .required('Please enter email'),
  address: string().trim().required('Please enter address'),
});

export default EditProfileSchema;
