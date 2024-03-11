import * as yup from 'yup';

let LoginSchema = yup.object().shape({
  user_name: yup.string().trim().required('Please enter information'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter information'),
});

export default LoginSchema;
