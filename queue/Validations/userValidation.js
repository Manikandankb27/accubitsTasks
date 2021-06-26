//function
import isEmpty from './isEmpty';

/**
 * admin login validation
 * params: email & password 
 */
export const userLoginInputValidate = (data) => {
  let errors = {}
  data.firstName = !isEmpty(data.firstName) ? data.firstName: "",
  data.lastName = !isEmpty(data.lastName) ? data.lastName: "",
  data.email = !isEmpty(data.email) ? data.email : "";
  data.age = !isEmpty(data.age) ? data.age : "";

  if (isEmpty(data.firstName)) {
    errors.firstName = 'firstName field is required';
  }
  if (isEmpty(data.lastName)) {
    errors.lastName = 'lastName field is required';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (isEmpty(data.age)) {
    errors.age = 'age field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}

