import {object, string} from 'yup';

let CreateDeliveryAddressSchema = object().shape({
  recipient_name: string().trim().required('Please enter recipient name'),
  phone_number: string().trim().required('Please enter phone number'),
  street_address: string().trim().required('Please enter street address'),
  city: string().trim().required('Please enter city'),
  country: string().trim().required('Please enter country'),
  postal_code: string().trim().required('Please enter postal code'),
});

export default CreateDeliveryAddressSchema;
