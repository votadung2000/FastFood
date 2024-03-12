import {object, string} from 'yup';

let LoginSchema = object().shape({
  user_name: string().trim().required('Please enter information'),
  password: string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter information'),
});

export default LoginSchema;
