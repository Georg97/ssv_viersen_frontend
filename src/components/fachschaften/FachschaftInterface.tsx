import { DocumentData } from "firebase/firestore"
import verein_interface from "./VereinInterface"

export default interface FachschaftInterface {
    // id: number
    // name: string
    // fachwart: string
    // vereine: verein_interface[]
    fachschaft: DocumentData
}
