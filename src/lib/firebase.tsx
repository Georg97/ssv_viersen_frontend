// import firebase from 'firebase/compat/app'
import { initializeApp, getApps, getApp } from "firebase/app";
// import 'firebase/compat/auth';
import { getAuth, GoogleAuthProvider, Config } from "firebase/auth";
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';
import { getFirestore, collection, where, getDocs, query, limit, doc, DocumentData } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCC4tIZ6rWWTPuYJx6oMApfsiQKblGkpeE",
    authDomain: "stadtsportverband-viersen.firebaseapp.com",
    projectId: "stadtsportverband-viersen",
    storageBucket: "stadtsportverband-viersen.appspot.com",
    messagingSenderId: "302743724160",
    appId: "1:302743724160:web:db28eb762a95dc9401c665",
    measurementId: "G-JPVTC7JE35"
  };

//   // Initialize Firebase
//   const app = firebase.initializeApp(firebaseConfig);
// //   const analytics = getAnalytics(app);

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }
function createFirebaseApp(config: any) {
    try {
        return getApp();
    } catch {
        return initializeApp(config);
    }
}

// const firebaseApp = initializeApp(firebaseConfig);
export const firebaseApp = createFirebaseApp(firebaseConfig);
// export const auth = firebase.auth()
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);
// export const storage = firebase.storage()
export const storage = getStorage(firebaseApp)

export async function getuserWithUsername(username: string) {
    const q = query(
          collection(firestore, 'users')
        , where('username', '==', username)
        , limit(1)
    )
    const userDoc = (await getDocs(q)).docs[0]
    return userDoc
}

export function postToJSON(doc: DocumentData) {
    const data = doc.data();
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}