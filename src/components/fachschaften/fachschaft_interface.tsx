import verein_interface from "./verein_interface"

export default interface fachschaft_interface {
    id: number
    name: string
    fachwart: string
    vereine: verein_interface[]
}
