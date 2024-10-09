import *as Yup from 'yup'

export const validationSchema = (infoData, requiredMessage) => Yup.object({
        email: Yup.string().email(infoData.email?.emailFormat).required(requiredMessage),
        phone: Yup.string().matches(/^(009665|\+9665|05)\d{8}$/, infoData.phone?.phoneFormat).required(requiredMessage)
    });