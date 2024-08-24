 import *as Yup from 'yup'

 export const productPatterns = {
    nameRegx: /^[A-Za-z]{2,16}\s[A-Za-z]{2,16}\s[A-Za-z]{2,16}$/,
    descriptionRegx: /^[A-Za-z0-9\._%+\-]{0,100}$/,
    quantityRegx:/^[0-9]{1,10}$/,
    priceRegx:/^[0-9]{1,10}$/,
    companyProfitRegx:/^[0-9]{1,5}$/,
    imagesRegx: /A-Za-z0-9\._%+\-\(\)]+\.(png|jpe?g|pdf)$/
}

export const productInfoInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Eg: Labtop",
      errorMessage: "Name should consist of at most 3 words",
      pattern: regexToString(productPatterns.nameRegx),
      required: true,
      label: "Name*"
    },
    {
      id: 2,
      name: "companyProfit",
      type: "number",
      placeholder: "Eg: 10",
      errorMessage: "invalid field",
      pattern: regexToString(productPatterns.companyProfitRegx),
      required: true,
      label: "Company Profit*"
    },
    {
      id: 3,
      name: "quantity",
      type: "number",
      placeholder: "Eg: 5",
      min: 1,
      errorMessage: "invalid field",
      pattern: regexToString(productPatterns.quantityRegx),
      required: true,
      label: "Quantity*"
    },
    {
      id: 4,
      name: "price",
      type: "number",
      min: 1,
      placeholder: "Eg: 30",
      errorMessage: "invalid field",
      pattern: regexToString(productPatterns.priceRegx),
      required: true,
      label: "Price*"
    },
    {
      id: 5,
      name: "categoryId",
      errorMessage: "invalid option",
      required: true,
      label: "Category*"
    },
    {
      id: 6,
      name: "images",
      type: "file",
      multiple: true,
      placeholder: "",
      errorMessage: "Required upload images",
      required: true,
      pattern: regexToString(productPatterns.imagesRegx),
      label: "Product Images"
    },
    {
      id: 7,
      name: "description",
      type: "text",
      placeholder: "Description",
      errorMessage: "Invalid Filed",
      textArea: true,
      pattern: regexToString(productPatterns.descriptionRegx),
      label: "Description"
    },
  ];

export function validateProductBeforeSubmit(productData, productImages, isEdit) {
  console.log("spaces cuases false images "+productImages[0].name)
  console.log("spaces cuases false description "+productPatterns.descriptionRegx.test(productData.description))
  
    return productPatterns.nameRegx.test(productData.name)&&
    productPatterns.quantityRegx.test(productData.quantity)&&
    productPatterns.priceRegx.test(productData.price)&&
    // productPatterns.descriptionRegx.test(productData.description)&&
    productPatterns.companyProfitRegx.test(productData.companyProfit)&&
    productData.categoryId!==null&&
    (isEdit || productImages[0].name!==null);
}

export const validationSchema =(productData, isEditing, companyProfit, requiredMessage)=> {return Yup.object({
    name: Yup.string().required(requiredMessage),
    companyProfit: Yup.number().when([], {
    is: () => companyProfit,
    then: ()=> Yup.number().typeError(productData.companyProfit.numbersOnly)
                  .min(1, productData.companyProfit.startFromOne)
                  .required(requiredMessage),
    otherwise: ()=> Yup.number().notRequired(), // No validation when editing
    }),
    description: Yup.string().nullable(),
    quantity: Yup.number().typeError(productData.quantity.numbersOnly)
    .min(1, productData.quantity.startFromOne)
    .required(requiredMessage),
    price: Yup.number().typeError(productData.price.numbersOnly)
    .min(1, productData.price.startFromOne)
    .required(requiredMessage),
    categoryId: Yup.number().required(requiredMessage),
    images: Yup.mixed().when([], {
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

export function fillProductFormData(fd, formData, productImages, companyProfit, productId, vendorId){

  fd.append("productPayload", JSON.stringify({
            productId: productId,
            vendorId: vendorId,
            name: formData.name,
            price: formData.price,
            quantity: formData.quantity,
            companyProfit: formData.companyProfit??companyProfit,
            description: formData.description===""?null:formData.description,
            categoryId: formData.categoryId
          }))
  if(productImages.length===0)fd.append('productImages', formData.images);
  for (let i = 0; i < productImages.length; i++) {
    fd.append('productImages', productImages[i]);
  }
}
function regexToString(regex) {
    return regex.toString().replace(/\//g, ""); //.replace(/\\\\/g, "\\");
}
export function translateInputText(tProductIfno){
  return productInfoInputs.map(input => {
    if(tProductIfno[input.name]){
      return {...input,
        label: tProductIfno[input.name]["label"],
        errorMessage: input.errorMessage ? tProductIfno[input.name]["errorMessage"]:null,
        title: input.title ? tProductIfno[input.name]["title"]:null
      }
    }
    return input
  })
  
}