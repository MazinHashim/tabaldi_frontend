import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"
import { number } from "yup";

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
        en: {
            translation: {
                requiredMessage: "Should not be empty",
                login: {
                    title: "Login",
                    subtitle: "Login to your account",
                    sendBtnText: "Send OTP",
                    phoneLabel: "Phone Number"
                },
                verify: {
                    title: "OTP Verification",
                    subtitle: "Type the verification code sent to your phone",
                    phonePlaceholder: "Phone Number",
                    otpLabelText: "Otp code",
                    loginBtnText: "Login",
                },
                main: { logoutNavBtn: "Logout" },
                vendorFormIfno: {
                    addVendorTitle: "Add New Vendor",
                    editVendorTitle: "Edit Vendor",
                    fullName: {
                        label: "Full Name*",
                        most3Words: "Must be 3 names and only 2 to 16 characters per name",
                        placeholder: "Eg: Ahmed mohammed Khalid",
                    },
                    phone: {
                        label: "Phone Number*",
                        phoneFormat: "Must be 10 digits only and start with 05",
                        placeholder: "Eg: 0512345678",
                    },
                    email: {
                        label: "Email*",
                        emailFormat: "Must be a valid email address",
                        placeholder: "Eg: example@email.com",
                    },
                    maxKilometerDelivery: {
                        label: "Max Kilometer Delivery",
                        numbersOnly: "Should be only digits",
                        placeholder: "Eg: 10",
                        title: "optional, this indicates you have delivery service"
                    },
                    minChargeLongDistance: {
                        label: "Min Charge For Long Distances",
                        numbersOnly: "Should be only digits",
                        placeholder: "Eg: 10",
                        title: "optional, this indicates you deliver for long distances"
                    },
                    vendorType: {
                        label: "Vendor Type*",
                        lengthInvalid: "Must be 2-20 characters and digits only",
                        placeholder: "Eg: grocery",
                    },
                    profileImage: { label: "Profile Image" },
                    licenseImage: {
                        label: "License Image*",
                    },
                    identityImage: {
                        label: "Identity Image*",
                    },
                    addBtn: "ADD",
                    editBtn: "EDIT"
                },
                vendorCard: {
                    notProvided: "Not Provided",
                    maxDeliveQuestion: "maximum kilometer for delivery?",
                    minChargeQuestion: "minimum charges for a long distaces?",
                    kmUnit: " KM",
                    aedUnit: " AED"
                },
                productFormInfo: {
                    addProductTitle: "Add New Product",
                    editProductTitle: "Edit Product",
                    name: {
                        label: "Name*",
                        charMost: "Name should consist of at most 3 words",
                        placeholder: "Eg: Labtop",
                    },
                    companyProfit: {
                        label: "Company Profit*",
                        numbersOnly: "Should be only digits",
                        startFromOne: "Should start from 1",
                        placeholder: "Eg: 10",
                    },
                    quantity: {
                        label: "Quantity*",
                        numbersOnly: "Should be only digits",
                        placeholder: "Eg: 5",
                    },
                    price: {
                        label: "Price",
                        numbersOnly: "Should be only digits",
                        placeholder: "Eg: 10",
                    },
                    categoryId: {
                        label: "Select Category*",
                        
                    },
                    images: {
                        label: "Product Images*"
                    },
                    description: { 
                        label: "Description" ,
                        placeholder: "Description"
                    },
                    addBtn: "ADD",
                    editBtn: "EDIT",
                },
                productCard: {
                    itemText: 'Items',
                    showDetails: 'Show Details',
                    aedUnit: " AED"
                },
                optionFormInfo: {
                    productChar: "Product Characteristics",
                    productAddons: "Product Addons",
                    companyProfit: "Company Profit",
                    name: {
                        label: "Name*",
                        errorMessage: "Name should not be empty"
                    },
                    fee: {
                        label: "Fee*",
                        errorMessage: "Fee should ne digits only"
                    },
                    groupFlag: {
                        label: "Group*",
                        errorMessage: "Group should not be empty"
                    },
                    addBtn: "ADD",
                    newGroupBtn: "New Group"
                },
                categoryFormInfo: {
                    name: {
                        label: "Name*",
                        errorMessage: "Name should not be empty"
                    },
                    addBtn: "ADD",
                    editBtn: "EDIT",
                }
            }
        },
        ar: {
            translation: {
                requiredMessage: "يجب أن لا يكون فارغاً",
                login: {
                    title: "تسجيل الدخول",
                    subtitle: "قم بتسجيل الدخول على حسابك",
                    sendBtnText: "إرسال كود التحقق",
                    phoneLabel: "رقم الهاتف"
                },
                verify: {
                    title: "التحقق من رقم الهاتف",
                    subtitle: "الرجاء كتابة كود التحقق المرسل إلى هاتفك",
                    phonePlaceholder: "رقم الهاتف",
                    otpLabelText: "كود التحقق",
                    loginBtnText: " تسجيل الدخول",
                },
                main: { logoutNavBtn: "تسجيل الخروج" },
                vendorFormIfno: {
                    addVendorTitle: "إضافة بائع",
                    editVendorTitle: "تعديل البائع",
                    fullName: {
                        label: "الإسم بالكامل*",
                        most3Words: "يجب أن يكون ثلاثي ويتراوح عدد الأحرف من 2 إلى 16 حرفًا فقط لكل اسم",
                        placeholder: "مثال: أحمد محمد حالد",
                    },
                    phone: {
                        label: "رقم الهاتف*",
                        phoneFormat: "يجب أن يتكون من 10 أرقام فقط ويبدأ بـ 05",
                        placeholder: "Eg: 0512345678",
                    },
                    email: {
                        label: "البريد الإلكتروني*",
                        eamilFormat: "يجب أن تكون صيغة البريد إلكتروني صحيحة",
                        placeholder: "Eg: example@email.com",
                    },
                    maxKilometerDelivery: {
                        label: "أقصي مسافة توصيل (بالكيلومترات)",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        placeholder: "Eg: 10",
                        startFromOne: "يبدأ من 1 إختياري",
                        title: "اختياري فهذا يدل على أن لديك خدمة التوصيل"
                    },
                    minChargeLongDistance: {
                        label: "الحد الأدنى للشحن لمسافات طويلة",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        startFromOne: "يبدأ من 1 إختياري",
                        placeholder: "Eg: 10",
                        title: "اختياري، فهذا يشير إلى أنك تقوم بالتوصيل لمسافات طويلة"
                    },
                    vendorType: {
                        label: "نوع محل البيع*",
                        lengthInvalid: "يجب أن يتكون من 2 إلى 20 حرفًا ورقمًا فقط",
                        placeholder: "Eg: grocery",
                    },
                    profileImage: { label: "صورة البروفايل" },
                    licenseImage: {
                        label: "صورة الرخصة*",
                    },
                    identityImage: {
                        label: "صورة الهوية*",
                    },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
                },
                vendorCard: {
                    notProvided: "غير متوفر",
                    maxDeliveQuestion: "أقصى مسافة للتوصيل؟",
                    minChargeQuestion: "أقل أجرة للمسافات البعيدة؟",
                    kmUnit: " كم",
                    aedUnit: " درهم"
                },
                productFormInfo: {
                    addProductTitle: "إضافة منتج جديد",
                    editProductTitle: "تعديل المنتج",
                    name: {
                        label: "إسم المنتج*",
                        charMost: "يجب أن لا يتجاوز 3 كلمات",
                        placeholder: "مثال: اللابتوب",
                    },
                    companyProfit: {
                        label: "فائدة الشركة*",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        startFromOne: "يبدأ من 1",
                        placeholder: "مثال: 10",
                    },
                    quantity: {
                        label: "الكمية المتوفرة*",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        startFromOne: "يبدأ من 1",
                        placeholder: "مثال: 5",
                    },
                    price: {
                        label: "سعر المنتج",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        startFromOne: "يبدأ من 1",
                        placeholder: "مثال: 10",
                    },
                    categoryId: {
                        label: "إختيار نوع المنتج*",
                        errorMessage: "يجب إختيار النوع"
                    },
                    images: {
                        label: "صور المنتج*",
                        errorMessage: "يجب إرفاق صورة واحدة على الأقل"
                    },
                    description: { label: "وصف المنتج", placeholder: "وصف المنتج" },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
                },
                productCard: {
                    itemText: 'قطعة',
                    showDetails: 'عرض التفاصيل',
                    aedUnit: " درهم"
                },
                optionFormInfo: {
                    productChar: "خصائص المنتج",
                    productAddons: "الإضافات",
                    companyProfit: "فائدة الشركة",
                    name: {
                        label: "الإسم*",
                        errorMessage: "يجب أن لا يكون فارغاً"
                    },
                    fee: {
                        label: "السعر*",
                        errorMessage: "يجب أن يكون أرقامًا فقط"
                    },
                    groupFlag: {
                        label: "الفئة*",
                        errorMessage: "يجب أن لا يكون فارغاً"
                    },
                    addBtn: "إضافة",
                    newGroupBtn: "فئة جديدة"
                },
                categoryFormInfo: {
                    name: {
                        label: "الإسم*",
                        errorMessage: "يجب أن لا يكون فارغاً"
                    },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
                }
            }
        }
    }
});