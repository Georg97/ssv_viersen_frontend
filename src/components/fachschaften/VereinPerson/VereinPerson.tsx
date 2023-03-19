import EditProps from "@/lib/EditProps";
import useEdit from "@/lib/useEdit";
import { KeyboardEvent, useReducer } from "react";
import EditButton from "../EditButton/EditButton";
import TextInput from "../TextInput/TextInput";
import PersonModel from "./PersonModel";
import VereinPersonProps from "./VereinPersonProps";

export default function VereinPerson(props: VereinPersonProps) {
    const editProps: EditProps = useEdit(
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
            <PersonPosition fachschaftId={props.fachschaftId} vereinId={props.vereinId} person={props.person} />
            {/* <div>
                <p className="text-xs p-0 m-0">{props.person?.data().position}</p>
            </div> */}
            <div className="flex gap-4 items-center">
                {editProps.user[0] && <EditButton editMode={editProps.editMode} setEditMode={editProps.setEditMode} />}
                {editProps.editMode ?
                    <TextInput value={editProps.currentValue} onChange={editProps.currentValueChanged} onKeyUp={editProps.onKeyUp} />
                    :
                    <h3 className="text-lg font-bold">{editProps.currentValue}</h3>

                }
            </div>
        </div>
    )
}

function PersonPosition(props: VereinPersonProps) {
    const editProps: EditProps = useEdit(
        props.person?.data().position
        , `Fachschaft/${props.fachschaftId}/Vereine/${props.vereinId}/Personen/${props.person?.id}`
        , (inputValue: string): PersonModel => {
            return {
                name: props.person?.data().name
                , position: inputValue
            } as PersonModel
        }
    )
    // const forceUpdate = useReducer(x => x + 1, 0)[0]

    return (
        <div className="flex gap-4 items-center">
            {editProps.user[0] && <EditButton editMode={editProps.editMode} setEditMode={editProps.setEditMode} className="text-xl" />}
            {editProps.editMode ?
                <TextInput value={editProps.currentValue} onChange={editProps.currentValueChanged} onKeyUp={editProps.onKeyUp} />
                :
                <h3 className="text-sm">{editProps.currentValue}</h3>

            }
        </div>
    )
}