import *as Yup from 'yup'

export const categoryPatterns = {
    nameRegx: /^[A-Za-z0-9]{1,16}$/,
}

export const categoryInfoInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Eg: large",
      errorMessage: "invalid field",
      pattern: regexToString(categoryPatterns.nameRegx),
      required: true,
      label: "Name*"
    }
  ];

export function validateCategoryBeforeSubmit(categoryData, isEdit) {
  
    return categoryPatterns.nameRegx.test(categoryData.name)&&
    (!isEdit || categoryData.categoryId!=null)
}
function regexToString(regex) {
    return regex.toString().replace(/\//g, ""); //.replace(/\\\\/g, "\\");
}
export const validationSchema =(productData, isEditing, requiredMessage)=> {return Yup.object({
    name: Yup.string().required(requiredMessage),
    published: Yup.number().when([], {
    is: () => !isEditing,
    then: ()=> Yup.boolean().required(requiredMessage),
    otherwise: ()=> Yup.number().notRequired(), // No validation when editing
    }),
})}