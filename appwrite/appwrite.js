import { Appwrite } from 'appwrite';
// Init your Web SDK
const appwrite = new Appwrite();

appwrite
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID) // Your project ID;

export default appwrite;