import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth.context/Auth.context";
import axios from "axios";


export const UserContext = createContext(null)
export default function UserContextProvider({children}){

    const { token } = useContext(AuthContext); 
    const [user, setUser] = useState(null);   

    async function getUserData(){

    if(!token) return;
        try {
            const options = {
                url: "https://linked-posts.routemisr.com/users/profile-data",
                method: "GET",
                headers: {token}
            }
            const {data} = await axios.request(options)
            console.log(data)
            setUser(data.user)
            }
            
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUserData()},[token]
    )
    return <UserContext.Provider value={{user, setUser}}>
                {children} 
            </UserContext.Provider>
}