import useAdd from "@/lib/useAdd";
import useEdit from "@/lib/useEdit";
import TextInput from "../fachschaften/TextInput/TextInput";
import PersonModel from "../fachschaften/VereinPerson/PersonModel";
import VereinPersonProps from "../fachschaften/VereinPerson/VereinPersonProps";

export default function AddPersonButton(props: VereinPersonProps) {
    const {
       user
        , editMode
        , setEditMode
        , isValid
        , setIsValid
        , currentValue
        , setCurrentValue
        , currentValueChanged
        , onKeyUp
    } = useAdd(
        props.person?.data().name
        , `Fachschaft/${props.fachschaftId}/Vereine/${props.vereinId}/Personen`
        , (inputValue: string): PersonModel => {
            return {
                name: inputValue
                , position: "Mitglied"
            } as PersonModel
        }
    )

    return (
        <>
            {editMode ?
                <div>
                    <TextInput onChange={currentValueChanged} onKeyUp={onKeyUp} value={currentValue} />
                    {isValid ? <p className="text-green-500 font-bold">Person kann angelegt werden</p> : <p className="text-red-600 font-bold">Person kann nicht angelegt werden</p>}
                </div>
                :
                <button onClick={() => setEditMode(true)} className="btn w-fit mx-auto px-4 text-xl font-bold hover:scale-110 mt-8 py-2">
                    {/* <span className="border-r-2 mr-1 pr-1">+</span> */}
                    Person hinzufügen
                </button>
            }
        </>
    )
}