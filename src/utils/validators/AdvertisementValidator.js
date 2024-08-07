import *as Yup from 'yup'

export const validationSchema =(advertisementData, isEditing, requiredMessage)=> {return Yup.object({
    title: Yup.string().required(requiredMessage),
    subtitle: Yup.string().notRequired(),
    vendorId: Yup.number().nullable().notRequired(),
    url: Yup.string()
      .matches(/^https?:\/\/[^\s/$.?#].[^\s]*$/,advertisementData.url?.urlFormat)
      .nullable()
      .notRequired(),
    adsImage : Yup.mixed().when([], {
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

export function fillAdvertisementFormData(fd, advertisement, advertisementId){
  fd.append("AdvertisementPayload", JSON.stringify({
            advertisementId: advertisementId,
            title: advertisement.title,
            subtitle: advertisement.subtitle,
            url: advertisement.url, vendorId: advertisement.vendorId==-1 ? null : advertisement.vendorId
          }))
  fd.append("adsImage", advertisement.adsImage)
}