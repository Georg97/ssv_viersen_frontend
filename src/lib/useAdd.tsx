import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { FormEvent, KeyboardEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function useAdd(value: string, docBasePath: string, getValueCallback: (inputValue: string) => any) {
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

        const copiedValue = event.currentTarget.value
        const ref = doc(getFirestore(), docBasePath, event.currentTarget.value)
        const snap = await getDoc(ref)
        setIsValid(!snap.exists())
        if (snap.exists())
            return

        if (event.code == 'Enter') {
            try {
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
    }
}