import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useReducer, useContext } from "react";
import db from "../firebase/firebase";
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from "firebase/firestore";
import appwrite from "../appwrite/appwrite";



export const ROOT_FOLDER = {
    name: "root",
    id: null,
    path: []
}

const reducer = (state, action) => {

    switch (action.type) {
        case "SELECT_FOLDER":
            return {
                ...state,
                folderId: action.payload.folderId,
                folder: action.payload.folder,
            }
            break;
        case "UPDATE_FOLDER":
            return {
                ...state,
                folder: action.payload.folder
            }
            break;
        case "SET_CHILD_FOLDERS":
            return {
                ...state,
                childFolders: action.payload.childFolders
            }
            break;
        case "SET_CHILD_FILES":
            return {
                ...state,
                childFiles: action.payload.childFiles
            }
    }

}

export default function useFolder(folderId, folder) {

    const initialState = {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const isUser = useContext(AuthContext);



    useEffect(() => {
        dispatch({
            type: "SELECT_FOLDER",
            payload: { folderId, folder }
        })
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId === null) {
            return dispatch({
                type: "UPDATE_FOLDER",
                payload: { folder: ROOT_FOLDER }
            })
        }
        // otherwise fetch from database
        const callFunc = async () => {
            const docRef = doc(db, "folders", folderId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                dispatch({
                    type: "UPDATE_FOLDER",
                    payload: { folder: { id: docSnap.id, ...docSnap.data() } }
                })
            } else {

                console.log("No such document!");
                dispatch({
                    type: "UPDATE_FOLDER",
                    payload: { folder: ROOT_FOLDER }
                })
            }
        }

        callFunc();

    }, [folderId])

    // set Child folders



    useEffect(() => {
        if (isUser) {
            const q = query(collection(db, "folders"), where("parentId", "==", folderId), where("userId", "==", isUser.$id), orderBy("createdAt"));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                dispatch({
                    type: "SET_CHILD_FOLDERS",
                    payload: { childFolders: documents }
                })
            });

            return () => unsubscribe();
        }
    }, [folderId, isUser])

    // setChild Files

    useEffect(() => {
        if (isUser) {
            const q = query(collection(db, "files"), where("folderId", "==", folderId), where("userId", "==", isUser.$id), orderBy("createdAt"));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                documents.forEach((file) => {
                    const result = appwrite.storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKETID, file.fileId);
                    console.log(result);
                    file.href = result.href
                })
                dispatch({
                    type: "SET_CHILD_FILES",
                    payload: { childFiles: documents }
                })

            });

            return () => unsubscribe();
        }
    }, [folderId, isUser])


    return state;

}