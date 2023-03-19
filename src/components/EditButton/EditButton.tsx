import EditButtonProps from "./EditButtonProps";

export default function EditButton(props: EditButtonProps) {
    return (
        <h4
            className="col-span-1 text-3xl h-fit hover:cursor-pointer hover:scale-125 transition-all text-green-500"
            onClick={() => props.setEditMode(!props.editMode)}
        >
            {props.editMode ?
                '✖'
                :
                '🖉'
            }
        </h4>
    )
}