 export const optionPatterns = {
    nameRegx: /^[A-Za-z0-9\._%+\-]{1,16}$/,
    groupRegx: /^[A-Za-z0-9]{0,16}$/,
    feeRegx:/^[0-9]{1,5}$/,
}

export const optionInfoInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Eg: large",
      errorMessage: "invalid field",
      pattern: regexToString(optionPatterns.nameRegx),
      required: true,
      label: "Name*"
    },
    {
      id: 2,
      name: "fee",
      type: "number",
      placeholder: "Eg: 10",
      errorMessage: "invalid field",
      pattern: regexToString(optionPatterns.feeRegx),
      required: true,
      label: "Fee*"
    },
    {
      id: 3,
      name: "groupFlag",
      type: "text",
      placeholder: "Eg: size",
      min: 1,
      errorMessage: "invalid field",
      pattern: regexToString(optionPatterns.groupRegx),
      required: true,
      label: "Group*"
    }
  ];

export function validateOptionBeforeSubmit(optionData) {
  
    return optionPatterns.nameRegx.test(optionData.name)&&
    optionData.productId!=null &&
    (optionData.fee==null || optionPatterns.feeRegx.test(optionData.fee))&&
    (optionData.groupFlag==null || optionPatterns.groupRegx.test(optionData.groupFlag));
}
// export function fillOptionFormData(fd, fromData, optionId, vendorId){
//   fd.append("optionPayload", JSON.stringify({
//             optionId: optionId,
//             vendorId: vendorId,
//             name: fromData.name,
//             price: fromData.price,
//             quantity: fromData.quantity,
//             companyProfit: fromData.companyProfit,
//             description: fromData.description===""?null:fromData.description,
//             categoryId: fromData.categoryId
//           }))
// }
function regexToString(regex) {
    return regex.toString().replace(/\//g, ""); //.replace(/\\\\/g, "\\");
}
export function translateInputText(tOptionIfno){
  return optionInfoInputs.map(input => {
    if(tOptionIfno[input.name]){
      return {...input,
        label: tOptionIfno[input.name]["label"],
        errorMessage: input.errorMessage ? tOptionIfno[input.name]["errorMessage"]:null,
        title: input.title ? tOptionIfno[input.name]["title"]:null
      }
    }
    return input
  })
  
}