import TextInputProps from "./TextInputProps";

export default function TextInput(props: TextInputProps) {
    return (
        <input
            className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm h-fit"
            type="text"
            value={props.value}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
        >
        </input>
    )
}