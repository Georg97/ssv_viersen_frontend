import { FormEvent, KeyboardEvent } from "react";

export default interface TextInputProps {
    value: string
    onChange: (event: FormEvent<HTMLInputElement>) => void
    onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void
}