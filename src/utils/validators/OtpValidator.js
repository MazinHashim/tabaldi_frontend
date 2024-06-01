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

export function validateOtpCodeBeforeSubmit(inputValue) {
    return otpPattern.test(inputValue);
}
function regexToString(regex) {
    return regex.toString().replace(/\//g, ""); //.replace(/\\\\/g, "\\");
}