import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()

    const [reg_user, set_Reg_user] = useState(null)

    const [count, setCount] = useState(1);

    useEffect(() => {
        const reg = async () => {
            if (user) {
                const { email, nickname } = user;
                console.log(email, nickname)
                await axios.post(`http://localhost:4000/register/${email}/${nickname}`, {
                    ...products
                })
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error))
            }
        }
        reg();
        set_Reg_user(user)
    }, [user])





    return (
        <UserContext.Provider value={{
            loginWithRedirect, logout, reg_user, count, setCount
        }}>{children}</UserContext.Provider>
    )
}
// make sure use
export const useUserContext = () => {
    return useContext(UserContext)
}