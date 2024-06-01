import { useContext } from "react"
import AuthContext ,{OrderContext, ProductContext, CategoryContext} from "../providers/AuthProvider"

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useProductsData = () => {
    return useContext(ProductContext)
}

export const useOrdersData = () => {
    return useContext(OrderContext)
}
export const useCategoriesData = () => {
    return useContext(CategoryContext)
}