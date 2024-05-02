import {object, string, ref} from 'yup';

let RegisterSchema = object().shape({
  name: string().trim().required('Please enter name'),
  user_name: string().trim().required('Please enter username'),
  password: string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter password'),
  re_password: string()
    .trim()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Please enter password again'),
  phone_number: string()
    .trim()
    .min(10, 'Incorrect phone number!')
    .max(10, 'Incorrect phone number!')
    .required('Please enter phone number'),
  email: string()
    .trim()
    .email('Incorrect email')
    .required('Please enter email'),
});

export default RegisterSchema;
