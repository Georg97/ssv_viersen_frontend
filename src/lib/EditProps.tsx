import { User } from "firebase/auth";
import { FormEvent, KeyboardEvent } from "react";
import { AuthStateHook } from "react-firebase-hooks/auth";

export default interface EditProps {
    user: AuthStateHook
    editMode: boolean
    setEditMode: (value: boolean) => void
    isValid: boolean
    setIsValid: (value: boolean) => void
    currentValue: string
    setCurrentValue: (value: string) => void
    currentValueChanged: (event: FormEvent<HTMLInputElement>) => void
    onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void
}