import { createContext, useReducer } from "react";

export const LocalContext = createContext();

const initialState = {
    loginWindow: null,
    signupWindow: null,
    addFolderModal: null
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
            break;
        case "setFolderModalVisibility":
            return {
                ...state,
                addFolderModal: action.payload
            }
            break;
        default:
            return state
    }

}


export default function LocalContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        loginWindow: state.loginWindow,
        signupWindow: state.signupWindow,
        addFolderModal: state.addFolderModal,
        dispatch
    }

    return (
        <LocalContext.Provider value={value}>
            {props.children}
        </LocalContext.Provider>
    )
}