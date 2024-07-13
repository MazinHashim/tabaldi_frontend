import *as Yup from 'yup'

export const vendorPatterns = {
    fullNameRegx: /^[A-Za-z]{2,16}\s[A-Za-z]{2,16}\s[A-Za-z]{2,16}$/,
    phoneRegx: /^05+[0-9]{8,8}$/,
    emailRegx: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,4}$/,
    maxKiloRegx:/^[0-9]{0,10}$/,
    minChargeRegx:/^[0-9]{0,10}$/,
    vendorTypeRegx:/^[A-Za-z0-9]{2,20}$/,
    fileNameRegx: /^[A-Za-z0-9\.\-]+\.(png|jpe?g|pdf)$/
}

export const vendorInfoInputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Eg: Ahmed Mohammed Musa",
      errorMessage: "invalid field",
      pattern: regexToString(vendorPatterns.fullNameRegx),
      required: true,
      label: "Full Name*"
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Eg: 05123456789",
      errorMessage: "Must be 10 digits only and start with 05",
      pattern: regexToString(vendorPatterns.phoneRegx),
      required: true,
      label: "Phone Number*"
    },
    {
      id: 3,
      name: "email",
      type: "text",
      placeholder: "Eg: example@gmail.com",
      errorMessage: "Must be a valid email address",
      pattern: regexToString(vendorPatterns.emailRegx),
      required: true,
      label: "Email*"
    },
    {
      id: 4,
      name: "maxKilometerDelivery",
      type: "number",
      placeholder: "Eg: 5",
      min: 1,
      title: "optional, this indicates you have delivery service",
      errorMessage: "invalid field",
      pattern: regexToString(vendorPatterns.maxKiloRegx),
      label: "Max Kilometer Delivery"
    },
    {
      id: 5,
      name: "minChargeLongDistance",
      type: "number",
      min: 1,
      title: "optional, this indicates you deliver for long distances",
      placeholder: "Eg: 13",
      errorMessage: "invalid field",
      pattern: regexToString(vendorPatterns.minChargeRegx),
      label: "Min Charge For Long Distances"
    },
    {
      id: 6,
      name: "vendorType",
      type: "text",
      placeholder: "Eg: restaurant",
      errorMessage: "It should be 2-20 characters and shouldn't include any special character",
      pattern: regexToString(vendorPatterns.vendorTypeRegx),
      required: true,
      label: "Vendor Type*"
    },
    {
      id: 7,
      name: "profileImage",
      type: "file",
      placeholder: "",
      errorMessage: "",
      required: false,
      label: "Profile Image"
    },
    {
      id: 8,
      name: "identityImage",
      type: "file",
      placeholder: "",
      errorMessage: "invalid field",
      required: true,
      label: "Identity Image*"
    },
    {
      id: 9,
      name: "licenseImage",
      type: "file",
      placeholder: "",
      errorMessage: "invalid field",
      required: true,
      label: "License Image*"
    },
  ];

// export function validateVendorBeforeSubmit(vendorData, isEdit) {
  
//     return vendorPatterns.fullNameRegx.test(vendorData.fullName)&&
//     (isEdit || vendorPatterns.phoneRegx.test(vendorData.phone))&&
//     (isEdit || vendorPatterns.emailRegx.test(vendorData.email))&&
//     vendorPatterns.maxKiloRegx.test(vendorData.maxKilometerDelivery)&&
//     vendorPatterns.minChargeRegx.test(vendorData.minChargeLongDistance)&&
//     vendorPatterns.vendorTypeRegx.test(vendorData.vendorType)&&
//     (vendorData.profileImage.name===""||
//     vendorPatterns.fileNameRegx.test(vendorData.profileImage.name))&&
//     (isEdit || vendorPatterns.fileNameRegx.test(vendorData.identityImage.name))&&
//     (isEdit || vendorPatterns.fileNameRegx.test(vendorData.licenseImage.name));
// }

export const validationSchema =(vendorData, isEditing, requiredMessage)=> {return Yup.object({
    fullName: Yup.string().required(requiredMessage),
    phone: Yup.string().when([], {
      is: () => !isEditing,
      then: ()=> Yup.string()
      .matches(/^(009665|\+9665|05)\d{8}$/,vendorData.phone?.phoneFormat)
      .required(requiredMessage),
      otherwise: ()=> Yup.mixed().notRequired(),
    }),
    email: Yup.string().when([], {
      is: () => !isEditing,
      then: ()=> Yup.string().email(vendorData.email?.emailFormat).required(requiredMessage),
      otherwise: ()=> Yup.mixed().notRequired(),
    }),
    maxKilometerDelivery: Yup.number().typeError(vendorData.maxKilometerDelivery?.numbersOnly)
    .min(1, vendorData.maxKilometerDelivery?.startFromOne)
    .required(requiredMessage),
    closingTime: Yup.string()
    .matches(/^(\d{2}:\d{2})$/, vendorData.closingTime?.invalidFormat).required(requiredMessage),
    openingTime: Yup.string()
    .matches(/^(\d{2}:\d{2})$/, vendorData.openingTime?.invalidFormat).required(requiredMessage),
    minChargeLongDistance: Yup.number().typeError(vendorData.minChargeLongDistance?.numbersOnly)
    .min(1, vendorData.minChargeLongDistance?.startFromOne)
    .required(requiredMessage),
    vendorType: Yup.string().required(requiredMessage),
    profileImage: Yup.mixed().notRequired(), // No validation when editing
    identityImage : Yup.mixed().when([], {
    is: () => !isEditing,
    then: ()=> Yup.mixed()
      .test(
        'fileSize',
        'حجم الصورة غير مدعوم',
        value => value && value.size <= 1024 * 1024 * 25 // 25 MB
      )
      .test(
        'fileType',
        `الملفات المدعومة png, jpg, jpeg, فقط`,
        value => value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      ),
      otherwise: ()=> Yup.mixed().notRequired(), // No validation when editing
    }),
    licenseImage : Yup.mixed().when([], {
    is: () => !isEditing,
    then: ()=> Yup.mixed()
      .test(
        'fileSize',
        'حجم الصورة غير مدعوم',
        value => value && value.size <= 1024 * 1024 * 25 // 25 MB
      )
      .test(
        'fileType',
        `الملفات المدعومة png, jpg, jpeg, فقط`,
        value => value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      ),
      otherwise: ()=> Yup.mixed().notRequired(), // No validation when editing
    }),
})}

export function fillVendorFormData(fd, vendor, userId, vendorId){
  fd.append("VendorPayload", JSON.stringify({
            vendorId: vendorId,
            fullName: vendor.fullName,
            vendorType: vendor.vendorType.toUpperCase(),
            maxKilometerDelivery: vendor.maxKilometerDelivery===""?null:vendor.maxKilometerDelivery,
            minChargeLongDistance: vendor.minChargeLongDistance===""?null:vendor.minChargeLongDistance,
            openingTime: vendor.openingTime,
            closingTime: vendor.closingTime,
            userId: userId
          }))
        fd.append("profileImage", vendor.profileImage)
        fd.append("licenseImage", vendor.licenseImage)
        fd.append("identityImage", vendor.identityImage)
}
function regexToString(regex) {
    return regex.toString().replace(/\//g, ""); //.replace(/\\\\/g, "\\");
}
export function translateInputText(tVendorIfno){
  return vendorInfoInputs.map(input => {
    if(tVendorIfno[input.name]){
      return {...input,
        label: tVendorIfno[input.name]["label"],
        errorMessage: input.errorMessage ? tVendorIfno[input.name]["errorMessage"]:null,
        title: input.title ? tVendorIfno[input.name]["title"]:null
      }
    }
    return input
  })
  
}