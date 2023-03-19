import useEdit from "@/lib/useEdit";
import { KeyboardEvent } from "react";
import EditButton from "../EditButton/EditButton";
import TextInput from "../TextInput/TextInput";
import PersonModel from "./PersonModel";
import VereinPersonProps from "./VereinPersonProps";

export default function VereinPerson(props: VereinPersonProps) {
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
    } = useEdit(
        props.person?.data().name
        , `Fachschaft/${props.fachschaftId}/Vereine/${props.vereinId}/Personen/${props.person?.id}`
        , (inputValue: string): PersonModel => {
            return {
                name: inputValue
                , position: props.person?.data().position
            } as PersonModel
        }
    )

    return (
        <div>
            <div>
                <p className="text-xs p-0 m-0">{props.person?.data().position}</p>
            </div>
            <div className="flex gap-4 items-center">
                {user[0] && <EditButton editMode={editMode} setEditMode={setEditMode} />}
                {editMode ?
                    <TextInput value={currentValue} onChange={currentValueChanged} onKeyUp={onKeyUp} />
                    :
                    <h3 className="text-lg font-bold">{props.person?.data().name}</h3>

                }
            </div>
        </div>
    )
}