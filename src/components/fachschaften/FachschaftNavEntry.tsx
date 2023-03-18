import Image from "next/image"
import { DocumentData } from "firebase/firestore"
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
                        <input type="text" value={currentName} onChange={currentNameChanged} className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm"></input>
                    :
                    <h4 className="col-span-4 ml-4">
                        {props.entry.data().name}
                    </h4>
                }
            </div>
        </div>
    )
}