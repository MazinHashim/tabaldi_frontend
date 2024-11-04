import { createContext, useState } from "react";

const AuthContext = createContext({})
export const ProductContext = createContext({});
export const OrderContext = createContext({});
export const CategoryContext = createContext({});

export const AuthProvider = ({children}) => {
    const token = localStorage.getItem("session_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const [auth, setAuth] = useState({token, refreshToken})

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export const OrderProvider = ({children}) => {
    const [orders, setOrders] = useState([])

    return (
        <OrderContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrderContext.Provider>
    )
}
export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([])

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default AuthContext