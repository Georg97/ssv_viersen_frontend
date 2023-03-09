// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, collection, setDoc, DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC4tIZ6rWWTPuYJx6oMApfsiQKblGkpeE",
  authDomain: "stadtsportverband-viersen.firebaseapp.com",
  projectId: "stadtsportverband-viersen",
  storageBucket: "stadtsportverband-viersen.appspot.com",
  messagingSenderId: "302743724160",
  appId: "1:302743724160:web:db28eb762a95dc9401c665",
  measurementId: "G-JPVTC7JE35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)

async function doit() {

    // const citiesRef = collection(db, "cities");

    // await setDoc(doc(citiesRef, "SF"), {
    //     name: "San Francisco", state: "CA", country: "USA",
    //     capital: false, population: 860000,
    //     regions: ["west_coast", "norcal"] });
    // await setDoc(doc(citiesRef, "LA"), {
    //     name: "Los Angeles", state: "CA", country: "USA",
    //     capital: false, population: 3900000,
    //     regions: ["west_coast", "socal"] });
    // await setDoc(doc(citiesRef, "DC"), {
    //     name: "Washington, D.C.", state: null, country: "USA",
    //     capital: true, population: 680000,
    //     regions: ["east_coast"] });
    // await setDoc(doc(citiesRef, "TOK"), {
    //     name: "Tokyo", state: null, country: "Japan",
    //     capital: true, population: 9000000,
    //     regions: ["kanto", "honshu"] });
    // await setDoc(doc(citiesRef, "BJ"), {
    //     name: "Beijing", state: null, country: "China",
    //     capital: true, population: 21500000,
    //     regions: ["jingjinji", "hebei"] });
    // const vereineRef = collection(db, "Vereine")

    // await setDoc(doc(vereineRef, "KSG Oh-Do-Kwan e.V."), {
    //     name: "test"
    // })
}

async function getEntry(name: string, setHook: (data: DocumentData) => void) {
    const docRef = doc(db, "Vereine", name)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists())
        setHook(docSnap.data())
    else
        return null
}

export default function FirebaseTest() {
    const [data, setData] = useState<DocumentData | null>(null)

    useEffect(() => {
        getEntry("Vereine", setData)
    }, [])

    doit()

    // let le_data = getEntry("KSG Oh-Do-Kwan e.V.")

    return (
        <>
            <h1>{data && data.Name}</h1>
            {/* <h2>{le_data.name}</h2> */}
        </>
    )
}