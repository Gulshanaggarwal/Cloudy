import { useReducer, createContext } from "react";

export const ToastContext = createContext();
const initialState = [];



const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.payload.id,
                    type: action.payload.type,
                    text: action.payload.text
                }
            ]
            break;
        case "REMOVE":
            return state.filter((ele) => ele.id !== action.payload.id);
            break;
        default:
            return state;
    }

}

export default function ToastContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const toasts = state;
    const toastDispatch = dispatch;

    return (
        <ToastContext.Provider value={[toasts, toastDispatch]}>
            {props.children}
        </ToastContext.Provider>
    )

}
