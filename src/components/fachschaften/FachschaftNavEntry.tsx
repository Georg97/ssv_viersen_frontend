import Image from "next/image"
import { doc, DocumentData, getFirestore, writeBatch } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { FormEvent, useState } from "react"

export interface FachschaftNavEntryProps {
    entry: DocumentData
    setCurrent: (current: number | null) => void
    currentId: number | null
    // isEditing: boolean
    // setIsEditting: (state: boolean) => void
}

export default function FachschaftNavEntry(props: FachschaftNavEntryProps) {
    const user = useAuthState(auth)
    const [editMode, setEditMode] = useState(false);
    const [currentName, setCurrentName] = useState(props.entry.data().name);

    const currentNameChanged = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setCurrentName(event.currentTarget.value)
        // props.setIsEditting(true)
    }
    const onCurrentNameKeyUp = async (event: any) => {
        // console.log(event.code);
        if (event.code == 'Enter' || event.code == 'Escape')
            setEditMode(false)
            // setCurrentName(event.currentTarget.value)
        if (event.code == 'Enter') {
            try {
                const targetDoc = doc(getFirestore(), 'Fachschaft', props.entry.id)

                const copiedValue = event.currentTarget.value

                const batch = writeBatch(getFirestore())
                batch.set(targetDoc, {
                      fachwart: props.entry.data().fachwart
                    , icon: props.entry.data().icon
                    , name: event.currentTarget.value
                 })
                 console.log(await batch.commit())
                 setCurrentName(copiedValue)
            } catch (error) {
                console.error("Error writing to firestore: ", error)
                return
            }
        }
    }

    return (
        <div
            className="flex flex-row items-center justify-start gap-4"
        >
            {user[0] && <h4 className="col-span-1 text-3xl hover:cursor-pointer hover:scale-125 transition-all text-green-500" onClick={() => setEditMode(!editMode)}>{editMode ? '✖' : '🖉' }</h4>}
            <div
                className={`grid grid-cols-6 mx-auto mt-4 font-bold text-xl hover:cursor-pointer hover:scale-125 origin-left transition-all ${props.entry.id == props.currentId ? 'text-blue-500 scale-150 hover:scale-150' : ''}`}
                onClick={() => props.setCurrent(props.entry.id)}
            >
                <Image
                    width={240}
                    height={240}
                    src={props.entry.data().icon}
                    alt="Icon"
                    className="h-full block w-auto col-span-1"
                />
                {
                    editMode ?
                        <input
                            className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm"
                            type="text"
                            value={currentName}
                            onChange={currentNameChanged}
                            onKeyUp={onCurrentNameKeyUp}
                        ></input>
                    :
                    <h4 className="col-span-4 ml-4">
                        {currentName}
                    </h4>
                }
            </div>
        </div>
    )
}