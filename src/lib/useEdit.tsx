import { doc, getFirestore, setDoc } from "firebase/firestore";
import { FormEvent, KeyboardEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import EditProps from "./EditProps";
import { auth } from "./firebase";

export default function useEdit(value: string, docPath: string, getValueCallback: (inputValue: string) => any) {
    const user = useAuthState(auth)
    const [editMode, setEditMode] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    const currentValueChanged = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setCurrentValue(event.currentTarget.value)
    }

    const onKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code == 'Enter' || event.code == 'Escape')
            setEditMode(false)

        if (event.currentTarget.value.length <= 2) {
            setIsValid(false)
            return
        }

        if (event.code == 'Enter') {
            try {
                // const ref = doc(getFirestore(), 'Fachschaft', props.fachschaft.id)
                const ref = doc(getFirestore(), docPath)
                const copiedValue = event.currentTarget.value
                setDoc(ref, getValueCallback(copiedValue))
                setCurrentValue(copiedValue)
            } catch (error) {
                console.error("Error writing to firestore: ", error)
                return
            }
        }
    }

    return {
          user
        , editMode
        , setEditMode
        , isValid
        , setIsValid
        , currentValue
        , setCurrentValue
        , currentValueChanged
        , onKeyUp
    } as EditProps
}

