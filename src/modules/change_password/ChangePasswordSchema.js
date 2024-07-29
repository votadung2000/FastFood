import {object, string, ref} from 'yup';

let ChangePasswordSchema = object().shape({
  email: string().trim().required('Please enter username'),
  password: string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter password'),
  new_password: string()
    .trim()
    .notOneOf([ref('password')], 'Passwords must not match')
    .required('Please enter password again'),
});

export default ChangePasswordSchema;
