import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
        en: {
            translation: {
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
                        errorMessage: "Must be 3 names and only 2 to 16 characters per name"
                    },
                    phone: {
                        label: "Phone Number*",
                        errorMessage: "Must be 10 digits only and start with 05"
                    },
                    email: {
                        label: "Email*",
                        errorMessage: "Must be a valid email address"
                    },
                    maxKilometerDelivery: {
                        label: "Max Kilometer Delivery",
                        errorMessage: "Must be only digits",
                        title: "optional, this indicates you have delivery service"
                    },
                    minChargeLongDistance: {
                        label: "Min Charge For Long Distances",
                        errorMessage: "Must be only digits",
                        title: "optional, this indicates you deliver for long distances"
                    },
                    vendorType: {
                        label: "Vendor Type*",
                        errorMessage: "Must be 2-20 characters and digits only"
                    },
                    profileImage: { label: "Profile Image" },
                    licenseImage: {
                        label: "License Image*",
                        errorMessage: "Image must be selected"
                    },
                    identityImage: {
                        label: "Identity Image*",
                        errorMessage: "Image must be selected"
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
                        errorMessage: "Name should consist of at most 3 words"
                    },
                    companyProfit: {
                        label: "Company Profit*",
                        errorMessage: "Must be only digits"
                    },
                    quantity: {
                        label: "Quantity*",
                        errorMessage: "Must be only digits"
                    },
                    price: {
                        label: "Price",
                        errorMessage: "Must be only digits"
                    },
                    category: {
                        label: "Select Category*",
                        errorMessage: "Must select one category"
                    },
                    images: {
                        label: "Product Images*",
                        errorMessage: "Images are required"
                    },
                    description: { 
                        label: "Description" ,
                        errorMessage: "Images are required"
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
                        errorMessage: "يجب أن يكون ثلاثي ويتراوح عدد الأحرف من 2 إلى 16 حرفًا فقط لكل اسم"
                    },
                    phone: {
                        label: "رقم الهاتف*",
                        errorMessage: "يجب أن يتكون من 10 أرقام فقط ويبدأ بـ 05"
                    },
                    email: {
                        label: "البريد الإلكتروني*",
                        errorMessage: "يجب أن تكون صيغة البريد إلكتروني صحيحة"
                    },
                    maxKilometerDelivery: {
                        label: "أقصي مسافة توصيل (بالكيلومترات)",
                        errorMessage: "يجب أن يكون أرقامًا فقط",
                        title: "اختياري فهذا يدل على أن لديك خدمة التوصيل"
                    },
                    minChargeLongDistance: {
                        label: "الحد الأدنى للشحن لمسافات طويلة",
                        errorMessage: "يجب أن يكون أرقامًا فقط",
                        title: "اختياري، فهذا يشير إلى أنك تقوم بالتوصيل لمسافات طويلة"
                    },
                    vendorType: {
                        label: "نوع محل البيع*",
                        errorMessage: "يجب أن يتكون من 2 إلى 20 حرفًا ورقمًا فقط"
                    },
                    profileImage: { label: "صورة البروفايل" },
                    licenseImage: {
                        label: "صورة الرخصة*",
                        errorMessage: "يجب إختيار الصورة"
                    },
                    identityImage: {
                        label: "صورة الهوية*",
                        errorMessage: "يجب إختيار الصورة"
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
                        errorMessage: "يجب أن لا يتجاوز 3 كلمات"
                    },
                    companyProfit: {
                        label: "فائدة الشركة*",
                        errorMessage: "يجب أن يكون أرقامًا فقط"
                    },
                    quantity: {
                        label: "الكمية المتوفرة*",
                        errorMessage: "يجب أن يكون أرقامًا فقط"
                    },
                    price: {
                        label: "سعر المنتج",
                        errorMessage: "يجب أن يكون أرقامًا فقط"
                    },
                    category: {
                        label: "إختيار نوع المنتج*",
                        errorMessage: "يجب إختيار النوع"
                    },
                    images: {
                        label: "صور المنتج*",
                        errorMessage: "يجب إرفاق صورة واحدة على الأقل"
                    },
                    description: { label: "وصف المنتج", errorMessage: "يجب إرفاق صورة واحدة على الأقل" },
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