import *as Yup from 'yup'

export const categoryPatterns = {
    nameRegx: /^[A-Za-z0-9]{1,16}$/,
}
export const validationSchema =(productData, isEditing, requiredMessage)=> {return Yup.object({
    name: Yup.string().required(requiredMessage),
    arName: Yup.string().required(requiredMessage),
    published: Yup.number().when([], {
    is: () => !isEditing,
    then: ()=> Yup.boolean().required(requiredMessage),
    otherwise: ()=> Yup.number().notRequired(), // No validation when editing
    }),
})}