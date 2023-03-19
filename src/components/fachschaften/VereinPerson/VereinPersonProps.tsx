import { DocumentData } from "firebase/firestore"

export default interface VereinPersonProps {
    fachschaftId: string
    vereinId: string
    person: DocumentData | null
}