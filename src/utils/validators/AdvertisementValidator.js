import *as Yup from 'yup'
export const adsPriorites = [
  {priority: 1, arName:"إعلان 1" ,enName:"Ad 1"},
  {priority: 2, arName:"إعلان 2" ,enName:"Ad 2"},
  {priority: 3, arName:"إعلان 3" ,enName:"Ad 3"},
  {priority: 4, arName:"إعلان 4" ,enName:"Ad 4"},
  {priority: 5, arName:"إعلان 5" ,enName:"Ad 5"}];

export const validationSchema =(advertisementData, isEditing, formData, requiredMessage)=> {return Yup.object({
    title: Yup.string().required(requiredMessage),
    subtitle: Yup.string().notRequired(),
    vendorId: Yup.number().nullable().notRequired(),
    priority: Yup.number()
    .oneOf(adsPriorites.map(pr=>pr.priority), advertisementData.priority?.notSupported)
    .max(5).min(1).required(requiredMessage),
    createDate: Yup.string().required(requiredMessage),
    expireDate: Yup.string().required(requiredMessage),
    startTime: Yup.string().required(requiredMessage),
    endTime: Yup.string().required(requiredMessage),
    url: Yup.string().when([], {
      is: () => formData.url,
      then: ()=> Yup.string().matches(/^https?:\/\/[^\s/$.?#].[^\s]*$/,advertisementData.url?.urlFormat),
      otherwise: ()=> Yup.string().notRequired()
    }),
    adsImage1 : Yup.mixed().when([], {
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
    // adsImage2 : Yup.mixed().when([], {
    // is: () => !isEditing,
    // then: ()=> Yup.mixed()
    //   .test(
    //     'fileSize',
    //     'حجم الصورة غير مدعوم',
    //     value => value && value.size <= 1024 * 1024 * 25 // 25 MB
    //   )
    //   .test(
    //     'fileType',
    //     `الملفات المدعومة png, jpg, jpeg, فقط`,
    //     value => value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
    //   ),
    //   otherwise: ()=> Yup.mixed().notRequired(), // No validation when editing
    // }),
    // adsImage3 : Yup.mixed().when([], {
    // is: () => !isEditing,
    // then: ()=> Yup.mixed()
    //   .test(
    //     'fileSize',
    //     'حجم الصورة غير مدعوم',
    //     value => value && value.size <= 1024 * 1024 * 25 // 25 MB
    //   )
    //   .test(
    //     'fileType',
    //     `الملفات المدعومة png, jpg, jpeg, فقط`,
    //     value => value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
    //   ),
    //   otherwise: ()=> Yup.mixed().notRequired(), // No validation when editing
    // }),
})}

export function fillAdvertisementFormData(fd, advertisement, advertisementId){
  fd.append("AdvertisementPayload", JSON.stringify({
            advertisementId: advertisementId,
            title: advertisement.title,
            subtitle: advertisement.subtitle,
            createDate: advertisement.createDate,
            expireDate: advertisement.expireDate,
            startTime: advertisement.startTime,
            endTime: advertisement.endTime,
            priority: parseInt(advertisement.priority),
            url: advertisement.url, vendorId: advertisement.vendorId==="-1" ? null : parseInt(advertisement.vendorId)
          }))
  fd.append("adsImage1", advertisement.adsImage1)
  // fd.append("adsImage2", advertisement.adsImage2)
  // fd.append("adsImage3", advertisement.adsImage3)
}