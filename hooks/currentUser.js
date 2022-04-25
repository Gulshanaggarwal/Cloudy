import appwrite from "../appwrite/appwrite";
import { useState, useEffect } from "react";

export default function useCurrentUser() {

    const [isUser, setIsUser] = useState(null);

    const getTheUser = async () => {

        try {
            const user = await appwrite.account.get();
            setIsUser(user);
        } catch (error) {
            setIsUser(null);
        }

    }

    useEffect(() => {
        getTheUser();
    }, [])

    return isUser;
}