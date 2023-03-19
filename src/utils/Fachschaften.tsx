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

export async function getVereineForFachschaft(id: string) {
    const q = query(
        collection(firestore, `Fachschaft/${id}/Vereine`)
        , orderBy('name')
    )
    const vereine = (await getDocs(q)).docs
    return vereine
}

export async function getPersonenForVerein(fachschaftId: string, vereinId: string) {
    const q = query(
        collection(firestore, `Fachschaft/${fachschaftId}/Vereine/${vereinId}/Personen`)
        , orderBy('name')
    )
    const personen = (await getDocs(q)).docs
    return personen
}