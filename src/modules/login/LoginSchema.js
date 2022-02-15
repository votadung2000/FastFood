import * as yup from 'yup';

let LoginSchema = yup.object().shape({
  user_name: yup.string().trim().required('Vui lòng nhập thông tin'),
  password: yup
    .string()
    .trim()
    .min(6, 'Mật khẩu phải có 6 ký tự trở lên')
    .required('Vui lòng nhập thông tin'),
});

export default LoginSchema;
