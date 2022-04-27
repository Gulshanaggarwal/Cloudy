import appwrite from "../appwrite/appwrite";
import { createContext } from "react";


export const AuthContext = createContext(null);


const getCurrentUser = async () => {

    try {
        return await appwrite.account.get();
    } catch (error) {
        return null
    }

}

export default getCurrentUser;