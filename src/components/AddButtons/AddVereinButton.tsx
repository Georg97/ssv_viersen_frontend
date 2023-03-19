import { doc, getDoc, getFirestore, setDoc, writeBatch } from "firebase/firestore";
import { FormEvent, useState } from "react";
import VereinInterface from "../fachschaften/VereinInterface";

export default function AddVereinButton(props: VereinInterface) {
    const [editMode, setEditMode] = useState(false);
    const [newVereinName, setNewVereinName] = useState("");
    const [isValid, setIsValid] = useState(false);

    const newVereinNameChanged = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewVereinName(event.currentTarget.value)
    }
    const onKeyUp = async (event: any) => {
        if (event.code == 'Enter' || event.code == 'Escape')
            setEditMode(false)

        if (event.currentTarget.value.length <= 2) {
            setIsValid(false)
            return
        }
        const copiedValue = event.currentTarget.value
        const ref = doc(getFirestore(), 'Fachschaft', props.fachschaftId, 'Vereine', event.currentTarget.value)
        const snap = await getDoc(ref)
        setIsValid(!snap.exists())
        if (snap.exists())
            return

        if (event.code == 'Enter') {
            try {
                setDoc(ref, {
                      name: copiedValue
                    , adresse: ""
                    , homepage: ""
                })
                setNewVereinName(copiedValue)
            } catch (error) {
                console.error("Error writing to firestore: ", error)
                return
            }
        }
    }

    return (
        <>
            {editMode ?
                <div>
                    <input
                        className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm"
                        type="text"
                        value={newVereinName}
                        onChange={newVereinNameChanged}
                        onKeyUp={onKeyUp}
                    ></input>
                    {isValid ? <p className="text-green-500 font-bold">Verein kann angelegt werden</p> : <p className="text-red-600 font-bold">Verein kann nicht angelegt werden</p>}
                </div>
                :
                <button onClick={() => setEditMode(true)} className="btn w-fit mx-auto px-4 text-xl font-bold hover:scale-110 mt-8 py-2">
                    {/* <span className="border-r-2 mr-1 pr-1">+</span> */}
                    Verein hinzufügen
                </button>
            }
        </>
    )
}