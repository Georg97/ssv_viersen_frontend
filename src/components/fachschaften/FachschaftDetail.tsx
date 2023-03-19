import { auth } from "@/lib/firebase";
import { getVereineForFachschaft } from "@/utils/Fachschaften";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import EditButton from "../EditButton/EditButton";
import AddVereinButton from "./AddVereinButton";
import FachschaftInterface from "./FachschaftInterface";
import VereinDetail from "./VereinDetail";

export default function FachschaftDetail(props: FachschaftInterface) {
    const user = useAuthState(auth)
    const [vereine, setVereine] = useState<DocumentData[] | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [currentFachwartName, setCurrentFachwartName] = useState(props.fachschaft.data().fachwart);
    const [isValid, setIsValid] = useState(false);

    const currentFachwartNameChanged = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setCurrentFachwartName(event.currentTarget.value)
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
                const ref = doc(getFirestore(), 'Fachschaft', props.fachschaft.id)
                const copiedValue = event.currentTarget.value
                setDoc(ref, {
                    name: props.fachschaft.data().name
                    , fachwart: copiedValue
                    , icon: props.fachschaft.data().icon
                })
                setCurrentFachwartName(copiedValue)
            } catch (error) {
                console.error("Error writing to firestore: ", error)
                return
            }
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await getVereineForFachschaft(props.fachschaft.id)
            setVereine(data)
        }
        getData()
    }, [props.fachschaft.id])

    return (
        <div className="grid grid-cols-3">
            <h3 className="col-span-1 text-4xl text-blue-500 border-b-2 border-stone-900 dark:border-stone-300 font-bold">Fachwart</h3>
            <h3 className="col-span-2 text-4xl text-blue-500 border-b-2 border-stone-900 dark:border-stone-300 font-bold">Vereine</h3>
            <div className="flex flex-row gap-4">
                {user[0] && <EditButton editMode={editMode} setEditMode={setEditMode} />}
                {editMode ?
                    <input
                        className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm h-fit"
                        type="text"
                        value={currentFachwartName}
                        onChange={currentFachwartNameChanged}
                        onKeyUp={onKeyUp}
                    ></input>
                    :
                    <h3 className="text-2xl col-span-1">{props.fachschaft.data().fachwart}</h3>
                }
            </div>
            <div className="flex flex-col col-span-2">
                {/* {fachschaft.vereine.map(verein => (
                    <VereinDetail verein={verein} key={verein.name}/>
                ))} */}
                {vereine && vereine.map(verein => (
                    <VereinDetail fachschaftId={props.fachschaft.id} verein={verein} key={verein.id} />
                ))}
                { user[0] && <AddVereinButton fachschaftId={props.fachschaft.id} verein={null} /> }
            </div>
        </div>
    )
}
