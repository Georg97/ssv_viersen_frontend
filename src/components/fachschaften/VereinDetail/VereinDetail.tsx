import EditProps from "@/lib/EditProps";
import { auth } from "@/lib/firebase";
import useEdit from "@/lib/useEdit";
import { getPersonenForVerein } from "@/utils/Fachschaften";
import { doc, DocumentData, getFirestore, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddPersonButton from "../AddButtons/AddPersonButton";
import EditButton from "../EditButton/EditButton";
import TextInput from "../TextInput/TextInput";
import VereinInterface from "../VereinInterface";
import VereinPerson from "../VereinPerson/VereinPerson";
import VereinModel from "./VereinModel";

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
        <div className='border-b-[1px] border-stone-900 dark:border-stone-300 py-4 grid grid-cols-2'>
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
                    <h1 className="text-3xl font-bold mb-4 text-blue-500">{currentVereinName}</h1>
                }
            </div>
            <VereinHomepage fachschaftId={props.fachschaftId} verein={props.verein} />
            <VereinAdresse fachschaftId={props.fachschaftId} verein={props.verein} />
            <h4 className="text-blue-500 font-bold text-2xl mt-4 mb-1">Personen</h4>
            <hr className="col-span-2 border-stone-500 dark:border-stone-700 mb-2"></hr>
            {personen && personen.map(person => (
                <VereinPerson fachschaftId={props.fachschaftId} vereinId={props.verein?.id} person={person} key={person.id} />
            ))}
            <AddPersonButton fachschaftId={props.fachschaftId} vereinId={props.verein?.id} person={null} />
        </div>
    )
}

function VereinHomepage(props: VereinInterface) {
    const editProps: EditProps = useEdit(
        props.verein?.data().homepage
        , `Fachschaft/${props.fachschaftId}/Vereine/${props.verein?.id}`
        , (inputValue: string): VereinModel => {
            return {
                homepage: inputValue
                , adresse: props.verein?.data().adresse
                , name: props.verein?.data().name
            } as VereinModel
        }
    )

    return (
        <div className="col-span-2 flex flex-col">
            <p className="text-xs">Homepage</p>
            <div className="flex gap-4">
                {editProps.user[0] && <EditButton editMode={editProps.editMode} setEditMode={editProps.setEditMode} />}
                {editProps.editMode ?
                    <TextInput onChange={editProps.currentValueChanged} onKeyUp={editProps.onKeyUp} value={editProps.currentValue} />
                    :
                    <h1 className="font-bold mb-4">{editProps.currentValue}</h1>
                }
            </div>
        </div>
    )
}

function VereinAdresse(props: VereinInterface) {
    const editProps: EditProps = useEdit(
        props.verein?.data().adresse
        , `Fachschaft/${props.fachschaftId}/Vereine/${props.verein?.id}`
        , (inputValue: string): VereinModel => {
            return {
                homepage: props.verein?.data().homepage
                , adresse: inputValue
                , name: props.verein?.data().name
            } as VereinModel
        }
    )

    return (
        <div className="col-span-2 flex flex-col">
            <p className="text-xs">Adresse</p>
            <div className="flex gap-4">
                {editProps.user[0] && <EditButton editMode={editProps.editMode} setEditMode={editProps.setEditMode} />}
                {editProps.editMode ?
                    <TextInput onChange={editProps.currentValueChanged} onKeyUp={editProps.onKeyUp} value={editProps.currentValue} />
                    :
                    <h1 className="font-bold mb-4">{editProps.currentValue}</h1>
                }
            </div>
        </div>
    )
}