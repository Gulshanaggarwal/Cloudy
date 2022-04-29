import { Appwrite } from 'appwrite';
// Init your Web SDK
const appwrite = new Appwrite();

appwrite
    .setEndpoint(process.env.APPWRITE_PROJECTID) // Your Appwrite Endpoint
    .setProject(process.env.APPWRITE_ENDPOINT) // Your project ID
    ;

export default appwrite;