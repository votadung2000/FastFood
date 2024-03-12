import {object, string} from 'yup';

let RegisterSchema = object().shape({
  name: string().trim().required('Please enter information'),
  user_name: string().trim().required('Please enter information'),
  password: string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter information'),
  phone_number: string().trim().required('Please enter information'),
  email: string().trim().required('Please enter information'),
});

export default RegisterSchema;
