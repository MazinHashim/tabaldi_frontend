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
export function translateInputText(tCategoryIfno){
  return categoryInfoInputs.map(input => {
    if(tCategoryIfno[input.name]){
      return {...input,
        label: tCategoryIfno[input.name]["label"],
        errorMessage: input.errorMessage ? tCategoryIfno[input.name]["errorMessage"]:null,
        title: input.title ? tCategoryIfno[input.name]["title"]:null
      }
    }
    return input
  })
  
}