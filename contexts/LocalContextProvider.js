import { createContext, useReducer } from "react";

export const LocalContext = createContext();

const initialState = {
    loginWindow: null,
    signupWindow: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setLoginVisibility":
            return {
                ...state,
                loginWindow: action.payload
            }
            break;
        case "setSignupVisibility":
            return {
                ...state,
                signupWindow: action.payload
            }
    }

}


export default function LocalContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        loginWindow: state.loginWindow,
        signupWindow: state.signupWindow,
        dispatch
    }
    return (
        <LocalContext.Provider value={value}>
            {props.children}
        </LocalContext.Provider>
    )
}