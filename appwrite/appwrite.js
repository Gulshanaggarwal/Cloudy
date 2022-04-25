import { Appwrite } from 'appwrite';
// Init your Web SDK
const appwrite = new Appwrite();

appwrite
    .setEndpoint('http://localhost/v1') // Your Appwrite Endpoint
    .setProject('gulshan333') // Your project ID
    ;

export default appwrite;