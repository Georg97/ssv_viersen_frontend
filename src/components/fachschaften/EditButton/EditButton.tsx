import { FormEvent } from "react";
import EditButtonProps from "./EditButtonProps";

export default function EditButton(props: EditButtonProps) {
    return (
        <h4
            className={`col-span-1 text-3xl h-fit hover:cursor-pointer hover:scale-125 transition-all text-green-500 ${props.className}`}
            onClick={(event: any) => {
                props.setEditMode(!props.editMode)
                // if (props.onClickHandler)
                //     props.onClickHandler(event)
            }}
        >
            {props.editMode ?
                '✖'
                :
                '🖉'
            }
        </h4>
    )
}