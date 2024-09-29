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
                search: "Search",
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
                adminHomeInfo: {
                    welcomeTxt: "Welcome Back! Rateena Management",
                    subPargTxt: "Rateena Management is simple and clean design for vendors and supplier.",
                    earningTxt: "Earnings",
                    viewVendor: "View Vendors",
                    newSales: "New Sales",
                    pendingTxt: "Pending Orders",
                    noPendingTxt: "No Pending Orders",
                    freqCustTxt: "Most Frequently Customers",
                    freqVendorTxt: "Most Frequently Vendors",
                    revenueTxt: "Daily Revenue",
                    customersTxt: "Customers",
                    orderTxt: "Orders",
                    inTwoDays: "in 2 days",
                    vendorName: "Vendor Name",
                    customerName: "Customer Name",
                    vendorType: "Vendor Type",
                    birthDate: "Date of Birth",
                    gender: "Gender",
                    email: "Email",
                    phone: "Phone",
                    createdAt: "CreatedAt",
                    numOfOrd: "Number of Orders",
                },
                vendorHomeInfo: {
                    orderTxt: "Orders",
                    earningTxt: "Earnings",
                    productTxt: "Products",
                    seeTxt: "See",
                    pendingTxt: "Pending Orders",
                    noPendingTxt: "No Pending Orders",
                    freqProdTxt: "Most Frequent Products",
                    revenueTxt: "Daily Revenue",
                    addCatTxt: "Add Your Categories",
                    addProdTxt: "Add Your Products",
                    addCharTxt: "Add Product Characteristics",
                    recieveCustTxt: "Recieve Customers Orders",
                    trackCustTxt: "Track Customers Orders",
                    prodName: "Product Name",
                    category: "Category",
                    availQuant: "Available Quntity",
                    compProfit: "Company Profit",
                    price: "Price",
                    numOfOpt: "Number of Options",
                    numOfOrd: "Number of Orders"
                },
                vendorFormIfno: {
                    addVendorTitle: "Add New Vendor",
                    editVendorTitle: "Edit Vendor",
                    vendors: "Vendors",
                    fullName: {
                        label: "English Name*",
                        most3Words: "Must be 3 names and only 2 to 16 characters per name",
                        placeholder: "Eg: Rateena",
                    },
                    arFullName: {
                        label: "Arabic Name*",
                        most3Words: "Must be 3 names and only 2 to 16 characters per name",
                        placeholder: "Eg: رتينة",
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
                    viewCategories: "View Categories",
                    viewProducts: "View Products",
                    kmUnit: " KM",
                    aedUnit: " AED",
                    locationCopied: "Location copied",
                    copyFailed: "Location copy failed",
                    noLocationAvailable: "Vendor Location Not Selected From The Map"
                },
                advertisementFormIfno: {
                    addAdvertisementTitle: "Add Advertisement",
                    editAdvertisementTitle: "Edit Advertisement",
                    advertisements: "Advertisements",
                    adsLabel: "Banner",
                    availableBanners: "Available Banners",
                    visiable: "visiable",
                    visibility: "visibility",
                    hidden: "hidden",
                    searchTxt: "Search",
                    statusTxt: "Status",
                    title: {
                        label: "ُEnglish Title*",
                        placeholder: "Eg: Eid Offer",
                    },
                    arTitle: {
                        label: "Arabic Title*",
                        placeholder: "Eg: Eid Offer",
                    },
                    subtitle: {
                        label: "English Subtitle",
                        placeholder: "Eg: Best eid offer",
                    },
                    arSubtitle: {
                        label: "Arabic Subtitle",
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
                    replacePriority: {
                        label: "Replace existing priority?",
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
                    products: "Products",
                    name: {
                        label: "English Name*",
                        charMost: "Name should consist of at most 3 words",
                        placeholder: "Eg: Labtop",
                    },
                    arName: {
                        label: "Arabic Name*",
                        charMost: "Name should consist of at most 3 words",
                        placeholder: "Eg: لابتوب",
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
                    duration: {
                        label: "Ready within*",
                        placeholder: "Eg: From 1 To 5 days or mins",
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
                        label: "English Description" ,
                        placeholder: "English Description"
                    },
                    arDescription: { 
                        label: "Arabic Description" ,
                        placeholder: "Arabic Description"
                    },
                    addBtn: "ADD",
                    editBtn: "EDIT",
                },
                productCard: {
                    itemText: 'Items',
                    showDetails: 'Show Details',
                    reviewing: "Reviewing",
                    notVisible:"This product will not be visible to the customers",
                    quantityAboutAlert: "This product is about to finish, do you want to update the quantity?",
                    update: "Update Qnt.",
                    unpublish: "Unpublish",
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
                    addCategoryTitle: "Add Category",
                    editCategoryTitle: "Edit Category",
                    name: {
                        label: "Engilsh Name*",
                        errorMessage: "Name should not be empty"
                    },
                    arName: {
                        label: "Arabic Name*",
                        errorMessage: "Name should not be empty"
                    },
                    published: {
                        label: "Select Category Status",
                    },
                    products: "Products",
                    status: "Status",
                    publishedTxt: "Published",
                    unpublishedTxt: "Unpublished",
                    category: "Categories",
                    addNewBtn: "Add New Category",
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
                },
                orderDetailsInfo: {
                    backToOrders: "Back to all Orders",
                    orderNumber: "Order Number",
                    status: "status",
                    downloadInv: "Download Invoice",
                    custDetails: "Customer Details",
                    viewProfile: "View Profile",
                    shippAddress: "Shipping Address",
                    contactNum: "Contact No",
                    orderDetails: "Order Details",
                    orderNum: "Order No",
                    orderDate: "Order Date",
                    numOfItems: "Number of items",
                    orderTotal: "Order Total",
                    product: "Product",
                    quantity: "Quantity",
                    price: "Price",
                    total: "Total",
                    subtotal: "subtotal",
                    discount: "discount",
                    shippingCost: "shipping cost",
                    vat: "VAT",
                    grandTotal: "grand total",
                    paymentInfo: "Payment Info",
                    notes: "Notes",
                    saveNotes: "Save Notes",
                    save: "Save"
                },
                invoiceInfo: {
                    invoices: "invoices",
                    status: "Status",
                    draft: "Draft",
                    paid: "Paid",
                    unpaid: "Unpaid",
                    search: "Search",
                    invoiceNumber: "Invoice Number",
                    paymentMethod: "Payment Method",
                    issueDate: "Issue Date",
                    total: "Total",
                    viewOrder: "View Order"
                }
            }
        },
        ar: {
            translation: {
                requiredMessage: "يجب أن لا يكون فارغاً",
                action: "تعديل",
                search: "البحث",
                aedUnit: "درهم",
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
                vendorHomeInfo: {
                    orderTxt: "الطلبات",
                    earningTxt: "الأرباح",
                    productTxt: "المنتجات",
                    seeTxt: "شوف",
                    pendingTxt: "طلبات معلقة",
                    noPendingTxt: "لا يوجد طلبات معلقة",
                    freqProdTxt: "المنتجات الأكثر طلباً",
                    revenueTxt: "إيرادات اليوم",
                    addCatTxt: "أضف أصنافك الخاصة",
                    addProdTxt: "أضف منتجاتك",
                    addCharTxt: "أضف خصائص لمنتجاتك",
                    recieveCustTxt: "إستقبل طلبات الزبائن",
                    trackCustTxt: "راقب طلبات الزبائن",
                    prodName: "إسم المنتج",
                    category: "الصنف",
                    availQuant: "الكمية المتوفرة",
                    compProfit: "نسبة الشركة",
                    price: "السعر",
                    numOfOpt: "عدد الإضافات",
                    numOfOrd: "عدد الطلبات"
                },
                adminHomeInfo: {
                    welcomeTxt: "مرحباً بكم من جديد! إدارة راتينا",
                    subPargTxt: "يعد نظام إدارة Rateena تصميمًا بسيطًا ونظيفًا للبائعين والموردين.",
                    viewVendor: "إعرض البائعين",
                    newSales: "مبيعات جديدة",
                    pendingTxt: "طلبات معلقة",
                    noPendingTxt: "لا يوجد طلبات معلقة",
                    earningTxt: "الأرباح",
                    customersTxt: "الزبائن",
                    orderTxt: "الطلبات",
                    freqCustTxt: "الزبائن الأكثر طلباً",
                    freqVendorTxt: "البائعيين الأكثر طلباً",
                    revenueTxt: "إيرادات اليوم",
                    inTwoDays: "في يومين",
                    vendorName: "إسم المحل",
                    customerName: "إسم الزبون",
                    vendorType: "نوع المحل",
                    birthDate: "تاريخ الميلاد",
                    gender: "النوع الإجتماعي",
                    email: "البريد الإلكتروني",
                    phone: "رقم الهاتف",
                    createdAt: "تاريخ الإنشاء",
                    numOfOrd: "عدد الطلبات",
                },
                vendorFormIfno: {
                    addVendorTitle: "إضافة بائع",
                    editVendorTitle: "تعديل البائع",
                    vendors: "قائمة البائعيين",
                    fullName: {
                        label: "الإسم بالإنجليزي*",
                        most3Words: "يجب أن يكون ثلاثي ويتراوح عدد الأحرف من 2 إلى 16 حرفًا فقط لكل اسم",
                        placeholder: "مثال: Rateena",
                    },
                    arFullName: {
                        label: "الإسم بالالعربي*",
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
                    viewCategories: "عرض الأصناف",
                    viewProducts: "عرض المنتجات",
                    openingTxt: "من",
                    closingTxt: "إلى",
                    outOfService:"خارج الخدمة",
                    working: "يعمل",
                    kmUnit: " كم",
                    aedUnit: " درهم",
                    locationCopied: "تم نسخ رابط الموقع",
                    copyFailed: "لم يتم نسخ الرابط",
                    noLocationAvailable: "موقع المحل غير محددة من الخريطة"
                },
                advertisementFormIfno: {
                    addAdvertisementTitle: "إضافة إعلان",
                    editAdvertisementTitle: "تعديل إعلان",
                    advertisements: "الإعلانات",
                    adsLabel: "إعلان",
                    availableBanners: "الإعلانات المتاحة",
                    searchTxt: "البحث",
                    statusTxt: "الحالة",
                    visiable: "مرئي",
                    hidden: "مخفي",
                    visibility: "العرض",
                    title: {
                        label: "العنوان بالإنجليزي*",
                        placeholder: "مثال: عرض العيد",
                    },
                    arTitle: {
                        label: "العنوان بالعربي*",
                        placeholder: "مثال: عرض العيد",
                    },
                    subtitle: {
                        label: "الوصف بالإنجليزي*",
                        placeholder: "مثال:أفضل العروض للعيد",
                    },
                    arSubtitle: {
                        label: "الوصف بالعربي*",
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
                        label: "الترتيب",
                        notSupported: "غير موجود في القائمة",
                    },
                    replacePriority: {
                        label: "استبدال الإعلان الموجود؟",
                    },
                    createDate: { label: "تاريخ البدء*" },
                    expireDate: { label: "تاريخ الإنتهاء*" },
                    startTime: { label: "زمن البدء*" },
                    endTime: { label: "زمن الإنتهاء*" },
                    adsImage1: { label: "صورة الإعلان*" },
                    adsImage2: { label: "صورة رقم 2*" },
                    adsImage3: { label: "صورة رقم 3*" },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
                },
                productFormInfo: {
                    addProductTitle: "إضافة منتج جديد",
                    editProductTitle: "تعديل المنتج",
                    products: "المنتجات",
                    name: {
                        label: "الإسم بالإنجليزي*",
                        charMost: "يجب أن لا يتجاوز 3 كلمات",
                        placeholder: "مثال: Laptop",
                    },
                    arName: {
                        label: "إسم بالعربي*",
                        charMost: "يجب أن لا يتجاوز 3 كلمات",
                        placeholder: "مثال: اللابتوب",
                    },
                    companyProfit: {
                        label: "فائدة الشركة*",
                        numbersOnly: "يجب أن يكون أرقامًا فقط",
                        startFromOne: "يبدأ من 1",
                        placeholder: "مثال: 10",
                    },
                    duration: {
                        label: "مدة التجهيز*",
                        placeholder: "مثال: من - إلى -",
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
                    description: { label: "الوصف بالإنجليزي", placeholder: "الوصف بالإنجليزي" },
                    arDescription: { 
                        label: "الوصف بالعربي" ,
                        placeholder: "الوصف بالعربي"
                    },
                    addBtn: "إضافة",
                    editBtn: "تعديل",
                },
                productCard: {
                    itemText: 'قطعة',
                    showDetails: 'عرض التفاصيل',
                    reviewing: "مراجعة",
                    notVisible:"هذا المنتج لن يكون مرئياً للعملاء",
                    quantityAboutAlert: "هذا المنتج على وشك الانتهاء، هل تريد تحديث الكمية؟",
                    aedUnit: "درهم",
                    update: "تعديل الكمية",
                    unpublish: "إخفاء"
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
                    addCategoryTitle: "إضافة صنف",
                    editCategoryTitle: "تعديل صنف",
                    name: {
                        label: "الإسم بالإنجليزي*",
                        errorMessage: "يجب أن لا يكون فارغاً"
                    },
                    arName: {
                        label: "الإسم بالعربي*",
                        errorMessage: "يجب أن لا يكون فارغاً"
                    },
                    published: {
                        label: "إختيار حالة الصنف",
                    },
                    publishedTxt: "نشر",
                    unpublishedTxt: "إيقاف",
                    products: "المنتجات",
                    status: "الحالة",
                    category: "الأصناف",
                    addNewBtn: "إضافة صنف جديد",
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
                },
                orderDetailsInfo: {
                    backToOrders: "رجوع إلى الطلبات",
                    orderNumber: "رقم الطلب",
                    status: "الحالة",
                    downloadInv: "تحميل الفاتورة",
                    custDetails: "تفاصيل الزبون",
                    viewProfile: "عرض المعلومات",
                    shippAddress: "عنوان التوصيل",
                    contactNum: "رقم التواصل",
                    orderDetails: "تفاصيل الطلب",
                    orderNum: "رقم الطلب",
                    orderDate: "تاريخ الطلب",
                    numOfItems: "عدد العناصر",
                    orderTotal: "إجمالي الطلب",
                    product: "المنتج",
                    quantity: "المية",
                    price: "السعر",
                    total: "الإجمالي",
                    subtotal: "السعر",
                    discount: "تخفيض",
                    shippingCost: "كلفة التوصيل",
                    vat: "الضربية المضافة",
                    grandTotal: "الإجمالي الكلي",
                    paymentInfo: "معلومات الدفع",
                    notes: "الملاحظات",
                    saveNotes: "حفظ الملاحظات",
                    save: "حفظ"
                },
                invoiceInfo: {
                    invoices: "الفواتير",
                    status: "الحالة",
                    draft: "درافت",
                    paid: "مدفوعة",
                    unpaid: "غير مدفوعة",
                    search: "البحث",
                    invoiceNumber: "رقم الفاتورة",
                    paymentMethod: "طريقة الطدفع",
                    issueDate: "تاريخ الإستحقاق",
                    total: "الإجمالي",
                    viewOrder: "عرض الطلب"
                }
            }
        }
    }
});