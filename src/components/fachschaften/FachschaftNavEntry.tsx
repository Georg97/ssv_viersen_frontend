import Image from "next/image"
import { doc, DocumentData, getFirestore, writeBatch } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react"
import EditButton from "./EditButton/EditButton"
import FachschaftInterface from "./FachschaftInterface"
import EditProps from "@/lib/EditProps"
import useEdit from "@/lib/useEdit"
import FachschaftModel from "./FachschaftModel"
import { getStorage, ref, uploadBytes } from "firebase/storage"

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
    const onCurrentNameKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
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
            {user[0] && <EditButton editMode={editMode} setEditMode={setEditMode} />}
            <div
                className={`grid grid-cols-6 mx-auto mt-4 font-bold text-xl hover:cursor-pointer hover:scale-125 origin-left transition-all ${props.entry.id == props.currentId ? 'text-blue-500 scale-150 hover:scale-150' : ''}`}
                onClick={() => props.setCurrent(props.entry.id)}
            >
                {/* <Image
                    width={240}
                    height={240}
                    src={props.entry.data().icon}
                    alt="Icon"
                    className="h-full block w-auto col-span-1"
                    unoptimized
                /> */}
                <NavEntryImage entry={props.entry} currentId={props.currentId} setCurrent={props.setCurrent} />
                {
                    editMode ?
                        <input
                            // className="col-span-4 ml-4 text-stone-900 darktext-stone-300 text-sm"
                            className="col-span-5 ml-4 text-stone-900 darktext-stone-300 text-sm text-left"
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

function NavEntryImage(props: FachschaftNavEntryProps) {
    const editProps: EditProps = useEdit(
        props.entry.data().icon
        , `Fachschaft/${props.entry.id}`
        , (inputValue: string): FachschaftModel => {
            return {
                name: props.entry.data().name
                , icon: inputValue
                , fachwart: props.entry.data().fachwart
            } as FachschaftModel
        }
    )
    const imageStoragePath = `fachschaft_icons/${props.entry.data().name}_${props.entry.id}`
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/stadtsportverband-viersen.appspot.com/o/fachschaft_icons%2F${props.entry.data().name}_${props.entry.id}?alt=media`

    const fileSelector = useRef<HTMLInputElement | null>(null)


    const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault
        console.log(event);

        if (!event.currentTarget.files)
            return

        const file = event.currentTarget.files[0]

        // https://firebasestorage.googleapis.com/v0/b/stadtsportverband-viersen.appspot.com/o/taekwondo.svg?alt=media&token=d2a496bd-43ba-4d7f-8411-229a4abe089e

        const storage = getStorage()
        const imageRef = ref(storage, imageStoragePath)
        uploadBytes(imageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        })
    }

    return (
        <div className="relative overflow-hidden">
            {editProps.user[0] && (
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-stone-900 opacity-50 backdrop-saturate-50 hover:scale-110">
                    <button
                        className="w-full h-full text-slate-300"
                        onClick={() => fileSelector?.current?.click()}
                    >
                        🖉
                    </button>
                    <input
                        type="file"
                        className="hidden"
                        ref={fileSelector}
                        onChange={onImageChanged}
                        accept="image/*"
                        style={{ display: 'none' }}
                    ></input>
                </div>
            )}
            <Image
                width={240}
                height={240}
                // src={props.entry.data().icon}
                src={imageUrl}
                alt="Icon"
                className="h-full block w-auto col-span-1"
                unoptimized
            />
        </div>
    )
}