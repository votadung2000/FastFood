import * as yup from 'yup';

let RegisterSchema = yup.object().shape({
  name: yup.string().trim().required('Please enter information'),
  user_name: yup.string().trim().required('Please enter information'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter information'),
  phone_number: yup.string().trim().required('Please enter information'),
  email: yup.string().trim().required('Please enter information'),
});

export default RegisterSchema;
