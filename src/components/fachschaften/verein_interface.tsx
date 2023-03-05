import person_verein_interface from "./person_verein_interface"

export default interface verein_interface {
    id: number
    name: string
    personen: person_verein_interface[]
}
