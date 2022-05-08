import { createContext, useReducer } from "react";

export const LocalContext = createContext();

const initialState = {
    loginWindow: null,
    signupWindow: null,
    addFolderModal: false,
    loader: false,
    drawer: false,
    preview: false,
    moreActions: null,
    deletee: null

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
        case "setLoader":
            return {
                ...state,
                loader: action.payload
            }
        case "handleDrawer":
            return {
                ...state,
                drawer: action.payload
            }
        case "handlePreview":
            return {
                ...state,
                preview: action.payload
            }
        case "handleMoreActions":
            return {
                ...state,
                moreActions: action.payload
            }
        case "handleDeleteeLayer":
            return {
                ...state,
                deletee: action.payload
            }
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
        loader: state.loader,
        drawer: state.drawer,
        preview: state.preview,
        moreActions: state.moreActions,
        deletee: state.deletee,
        dispatch
    }

    return (
        <LocalContext.Provider value={value}>
            {props.children}
        </LocalContext.Provider>
    )
}