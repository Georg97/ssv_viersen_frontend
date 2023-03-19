import { auth } from "@/lib/firebase";
import { getPersonenForVerein } from "@/utils/Fachschaften";
import { doc, DocumentData, getFirestore, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import EditButton from "../EditButton/EditButton";
import VereinInterface from "./VereinInterface";

export default function VereinDetail(props: VereinInterface) {
    const user = useAuthState(auth)
    const [personen, setPersonen] = useState<DocumentData[] | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [currentVereinName, setCurrentVereinName] = useState(props.verein?.data().name);
    const [isValid, setIsValid] = useState(false);

    const currentVereinNameChanged = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setCurrentVereinName(event.currentTarget.value)
    }
    const onKeyUp = async (event: any) => {
        if (event.code == 'Enter' || event.code == 'Escape')
            setEditMode(false)

        if (event.currentTarget.value.length <= 2) {
            setIsValid(false)
            return
        }

        if (event.code == 'Enter') {
            try {
                const ref = doc(getFirestore(), 'Fachschaft', props.fachschaftId, 'Vereine', props.verein?.id)
                const copiedValue = event.currentTarget.value
                setDoc(ref, {
                      name: copiedValue
                    , adresse: props.verein?.data().adresse
                    , homepage: props.verein?.data().homepage
                })
                setCurrentVereinName(copiedValue)
            } catch (error) {
                console.error("Error writing to firestore: ", error)
                return
            }
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await getPersonenForVerein(props.fachschaftId, props.verein?.id)
            setPersonen(data)
        }
        getData()
    }, [props.fachschaftId, props.verein?.id])

    return (
        <div className='border-b-[1px] border-stone-500 py-4 grid grid-cols-2'>
            <div className="flex flex-row gap-4 col-span-2">
                {user[0] && <EditButton editMode={editMode} setEditMode={setEditMode} />}
                {editMode ?
                    <input
                        className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm h-fit"
                        type="text"
                        value={currentVereinName}
                        onChange={currentVereinNameChanged}
                        onKeyUp={onKeyUp}
                    ></input>
                    :
                    <h1 className="text-3xl font-bold mb-4 text-blue-500">{props.verein?.data().name}</h1>
                }
            </div>
            {personen && personen.map(person => (
                <div key={person.name}>
                    <p className="text-xs p-0 m-0">{person.data().position}</p>
                    <h3 className="text-lg font-bold">{person.data().name}</h3>
                </div>
            ))}
        </div>
    )
}
