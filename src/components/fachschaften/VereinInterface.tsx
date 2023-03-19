import { DocumentData } from "firebase/firestore"
import person_verein_interface from "./person_verein_interface"

export default interface VereinInterface {
    // id: number
    // name: string
    // personen: person_verein_interface[]
    fachschaftId: string
    verein: DocumentData
}
