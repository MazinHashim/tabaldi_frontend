import *as Yup from 'yup'

export const supportedVendorType=[
  {id: 1, name: "Restaurant / مطعم", value: "RESTAURANT"},
  {id: 2, name: "Grocery / بقالة", value: "GROCERY"},
  {id: 3, name: "Store / متجر", value: "STORE"}];

  export const supportedRegions=[
  {id: 1, name: "Dubai / دبي", value: "DUBAI"},
  {id: 2, name: "Sharjah / الشارقة", value: "SHARJAH"},
  {id: 3, name: "Ajman / عجمان", value: "AJMAN"}]

export const validationSchema =(vendorData, isEditing, requiredMessage)=> {return Yup.object({
    fullName: Yup.string().required(requiredMessage),
    arFullName: Yup.string().required(requiredMessage),
    lat: Yup.number().required(requiredMessage),
    lng: Yup.number().required(requiredMessage),
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
    vendorType: Yup.string()
    .oneOf(supportedVendorType.map(type=>type.value), vendorData.vendorType?.notSupported)
    .required(requiredMessage),
    region: Yup.string()
    .oneOf(supportedRegions.map(region=>region.value), vendorData.region?.notSupported)
    .required(requiredMessage),
    coverImage: Yup.mixed().notRequired(),
    profileImage: Yup.mixed().notRequired(),
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
            arFullName: vendor.fullName,
            email: vendor.email,
            lat: vendor.lat,
            lng: vendor.lng,
            phone: vendor.phone,
            region: vendor.region.toUpperCase(),
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
        fd.append("coverImage", vendor.coverImage)
}