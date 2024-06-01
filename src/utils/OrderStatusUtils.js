export const allStatuses = ["PROCESSING", "WAITING", "CONFIRMED", "DELIVERED", "CANCELED"];
export const statusTextColor = (status)=> {
    switch (status) {
        case "WAITING":
            return "text-warning-600"
        case "PROCESSING":
            return "text-info-600"
        case "CONFIRMED":
        case "DELIVERED":
            return "text-success-600"
        case "CANCELED":
            return "text-danger-600"
        default:
            return "text-black";
    }
}
export const statusBGColor = (status)=> {
    switch(status) {
    case "WAITING":
            return "bg-warning-300"
        case "PROCESSING":
            return "bg-info-300"
        case "CONFIRMED":
        case "DELIVERED":
            return "bg-success-300"
        case "CANCELED":
            return "bg-danger-300"
        default:
            return "bg-white";
    }
}