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
                requiredMessage: "Should not be empty",
                action: "Action",
                aedUnit: " AED",
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
                        placeholder: "Eg: Rateena",
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
                        notSupported: "Vendor type not supported",
                        placeholder: "Eg: GROCERY",
                    },
                    region: {
                        label: "Region*",
                        notSupported: "Region out of scope",
                    },
                    profileImage: { label: "Logo Image" },
                    coverImage: { label: "Cover Image" },
                    licenseImage: {
                        label: "License Image*",
                    },
                    identityImage: {
                        label: "UAE ID Image*",
                    },
                    openingTime: {
                        label: "Opening Time*",
                        invalidFormat: "Invalid time format",
                        placeholder: "Eg: pm 07:00",
                    },
                    closingTime: {
                        label: "Closing Time*",
                        invalidFormat: "Invalid time format",
                        placeholder: "Eg: pm 09:00",
                    },
                    addBtn: "ADD",
                    editBtn: "EDIT"
                },
                vendorCard: {
                    notProvided: "Not Provided",
                    maxDeliveQuestion: "maximum kilometer for delivery?",
                    minChargeQuestion: "minimum charges for a long distaces?",
                    openingTxt: "opening",
                    closingTxt: "closing",
                    outOfService:"Out of service",
                    working: "Working",
                    kmUnit: " KM",
                    aedUnit: " AED"
                },
                advertisementFormIfno: {
                    addAdvertisementTitle: "Add Advertisement",
                    editAdvertisementTitle: "Edit Advertisement",
                    title: {
                        label: "Title*",
                        placeholder: "Eg: Eid Offer",
                    },
                    subtitle: {
                        label: "Subtitle",
                        placeholder: "Eg: Best eid offer",
                    },
                    url: {
                        label: "Redirection link",
                        placeholder: "Eg: https://extarnal-src.com/ads-info",
                    },
                    vendorId: {
                        label: "Choose Vendor",
                        notSupported: "Not exist in the list",
                    },
                    priority: {
                        label: "Choose Priority",
                        notSupported: "Not exist in the list",
                    },
                    createDate: { label: "Start Date*" },
                    expireDate: { label: "End Date*" },
                    startTime: { label: "Start Time*" },
                    endTime: { label: "End Time*" },
                    adsImage1: { label: "Image 1*" },
                    adsImage2: { label: "Image 2*" },
                    adsImage3: { label: "Image 3*" },
                    addBtn: "ADD",
                    editBtn: "EDIT",
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
                },
                orderInfo: {
                    orderDate: { label: "Order Date" },
                    orderNumber: { label: "Order Number" },
                    customerName: { label: "Customer Name" },
                    productName: { label: "Product Name" },
                    customerPhone: { label: "Customer Phone Number" },
                    paymentMethod: { label: "Payment Method" },
                    status: { label: "Status" },
                    amount: { label: "Total" },
                    vendorNotes: { label: "Vendor Notes" },
                    comment: { label: "Customer Comment" },
                    processedDate: { label: "Processed Date" },
                    deliveredDate: { label: "Delivered Date" },
                    vendorName: { label: "Vendor Name" },
                    viewDetails: "View",
                    noOrders: "No Available Orders",
                    notYet: "Not Yet",
                    ordered: "Ordered",
                    waiting: "Waiting",
                    confirmed: "Confirmed",
                    processed: "Processed",
                    delivered: "Delivered",
                    search: "Search",
                }
            }
        },
        ar: {
            translation: {
                requiredMessage: "يجب أن لا يكون فارغاً",
                action: "تعديل",
                aedUnit: " درهم",
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
                        placeholder: "مثال: رتينة",
                    },
                    phone: {
                        label: "رقم الهاتف*",
                        phoneFormat: "يجب أن يتكون من 10 أرقام فقط ويبدأ بـ 05",
                        placeholder: "مثال: 0512345678",
                    },
                    email: {
                        label: "البريد الإلكتروني*",
                        eamilFormat: "يجب أن تكون صيغة البريد إلكتروني صحيحة",
                        placeholder: "مثال: example@email.com",
                    },
                    maxKilometerDelivery: {
                        label: "أقصي مسافة توصيل (بالكيلومترات)",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        placeholder: "مثال: 10",
                        startFromOne: "يبدأ من 1 إختياري",
                        title: "اختياري فهذا يدل على أن لديك خدمة التوصيل"
                    },
                    minChargeLongDistance: {
                        label: "الحد الأدنى للشحن لمسافات طويلة",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        startFromOne: "يبدأ من 1 إختياري",
                        placeholder: "مثال: 10",
                        title: "اختياري، فهذا يشير إلى أنك تقوم بالتوصيل لمسافات طويلة"
                    },
                    vendorType: {
                        label: "نوع محل البيع*",
                        notSupported: "نوع المحل فير مدعوم",
                    },
                    region: {
                        label: "موقع المحل*",
                        notSupported: "موقع المحل خارج النطاق",
                    },
                    profileImage: { label: "صورة البروفايل" },
                    coverImage: { label: "صورة الخلفية" },
                    licenseImage: {
                        label: "صورة الرخصة*",
                    },
                    identityImage: {
                        label: "صورة الهوية*",
                    },
                    openingTime: {
                        label: "يعمل من الساعة*",
                        invalidFormat: "صيغة الساعة غير صحيحة",
                        placeholder: "مثال:pm 07:00",
                    },
                    closingTime: {
                        label: "يغلق في الساعة*",
                        invalidFormat: "صيغة الساعة غير صحيحة",
                        placeholder: "مثال:pm 09:00",
                    },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
                },
                vendorCard: {
                    notProvided: "غير متوفر",
                    maxDeliveQuestion: "أقصى مسافة للتوصيل؟",
                    minChargeQuestion: "أقل أجرة للمسافات البعيدة؟",
                    openingTxt: "من",
                    closingTxt: "إلى",
                    outOfService:"خارج الخدمة",
                    working: "يعمل",
                    kmUnit: " كم",
                    aedUnit: " درهم"
                },
                advertisementFormIfno: {
                    addAdvertisementTitle: "إضافة إعلان",
                    editAdvertisementTitle: "تعديل إعلان",
                    title: {
                        label: "العنوان*",
                        placeholder: "مثال: عرض العيد",
                    },
                    subtitle: {
                        label: "وصف الإعلان*",
                        placeholder: "مثال:أفضل العروض للعيد",
                    },
                    url: {
                        label: "رابط الإنتقال",
                        placeholder: "مثال: https://extarnal-src.com/ads-info",
                    },
                    vendorId: {
                        label: "إختر البائع",
                        notSupported: "غير موجود في القائمة",
                    },
                    priority: {
                        label: "إختر الترتيب",
                        notSupported: "غير موجود في القائمة",
                    },
                    createDate: { label: "تاريخ البدء*" },
                    expireDate: { label: "تاريخ الإنتهاء*" },
                    startTime: { label: "زمن البدء*" },
                    endTime: { label: "زمن الإنتهاء*" },
                    adsImage1: { label: "صورة رقم 1*" },
                    adsImage2: { label: "صورة رقم 2*" },
                    adsImage3: { label: "صورة رقم 3*" },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
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
                },
                orderInfo: {
                    orderDate: { label: "تاريخ الطلب" },
                    orderNumber: { label: "رقم الطلب" },
                    customerName: { label: "إسم الزبون" },
                    productName: { label: "إسم المنتج" },
                    customerPhone: { label: "رقم هاتف الزيون" },
                    paymentMethod: { label: "طريقة الدفع" },
                    status: { label: "حالة الطلب" },
                    amount: { label: "الأجمالي" },
                    vendorNotes: { label: "ملاحظات البائع" }, 
                    comment: { label: "تعليق الزبون" },
                    processedDate: { label: "تاريخ المعالجة" },
                    deliveredDate: { label: "تاريخ التوصيل" },
                    vendorName: { label: "إسم البائع" },
                    viewDetails: "عرض التفاصيل",
                    noOrders: "لا توجد طلبات",
                    notYet: "لم يتم بعد",
                    ordered: "تم الطلب",
                    waiting: "قيد الإنتظار",
                    confirmed: "تم التأكيد",
                    processed: "تمت المعالجة",
                    delivered: "تم التوصيل",
                    search: "البحث"
                }
            }
        }
    }
});