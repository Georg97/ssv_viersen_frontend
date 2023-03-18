import { firestore } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getFachschaften() {
    const q = query(
        collection(firestore, 'Fachschaft')
        , orderBy('name')
    )
    const fachschaften = (await getDocs(q)).docs
    return fachschaften
}