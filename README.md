## Cloudy

Cloudy is a storage service which allows users to store their file & folders faster and securely. At Cloudy users can create folders and store their files smoothly. Cloudy is **superfast** at uploading your files, a user can upload multiple files at a time & It will take very less amount of time compared to other services because of [Appwrite](https://appwrite.io/) storage service.

## Features

- Superfast file uploading(multiple files included)
- Support file extensions- .jpg, .png, .gif, .txt, .pdf
- Easy File Preview
- File Download
- File Link Copy
- File & folder Delete(right click on a file or folder to delete)

## Tech- Stack

`NEXTJS`
`Appwrite`
`Firebase`
`Material-UI`

## We are already using Appwrite, then Firebase ?

We are using Appwrite's Login, SignIn & Storage services but for **Database** we preferred Firebase. Reason of choosing Firebase is lack amount of support from Appwrite's database service, we have nested fields like array of objects or deep nested objects in our documents but Appwrite doesn't support these complex data structure. I opened a comment in discussion thread regarding the problem, check it out here - [comment](https://dev.to/gulshanaggarwal/comment/1o3oh)

## Start Using Locally

- Clone the Repo:

  ```bash
  git clone https://github.com/Gulshanaggarwal/Cloudy
  ```

- To run the development server:

  ```bash
  npm install
  npm run dev
  # or
  yarn dev
  ```

- Install Appwrite & start docker instance, paste the project credentials in .env.local file & make sure permissions as well as file extensions (.jpg, .png, .gif, .txt, .pdf) are assigned.
- Create a project at [Firebase](https://firebase.google.com/), paste the project credentials in .env.local file & make sure firestore(database) read write permissions are granted.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variable Setup

- Create a .env.local file at the root of the repo.
- Now you need credentials from Appwrite & Firebase
- Env variables you need -

  - **NEXT_PUBLIC_APPWRITE_PROJECTID**
  - **NEXT_PUBLIC_APPWRITE_ENDPOINT**
  - **NEXT_PUBLIC_APPWRITE_STORAGE_BUCKETID**
  - **NEXT_PUBLIC_FIREBASE_API_KEY**
  - **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
  - **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
  - **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
  - **NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID**
  - **NEXT_PUBLIC_FIREBASE_APP_ID**
  - **NEXT_PUBLIC_FIREBASE_MESAUREMENT_ID**

- Once you are done, restart your development server & use the service.
