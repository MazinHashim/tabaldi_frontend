import *as Yup from 'yup'

export const otpPattern = /^[0-9]{4,4}$/

export const OTPInput = 
    {
      id: 5,
      name: "otpCode",
      type: "text",
      minLength: 4,
      maxLength: 4,
      placeholder: "1234",
      errorMessage: "invalid otp code",
      pattern: regexToString(otpPattern),
      label: "otp code",
      required: true,
    };

export const validationSchema =(requiredMessage)=> {return Yup.object({
    otpCode: Yup.string()
    .matches(/^\d{4}$/, "Must be exactly 4 digits")
    .required(requiredMessage)
    .typeError("Must be a number")
})}
export function validateOtpCodeBeforeSubmit(inputValue) {
    return otpPattern.test(inputValue);
}
function regexToString(regex) {
    return regex.toString().replace(/\//g, ""); //.replace(/\\\\/g, "\\");
}