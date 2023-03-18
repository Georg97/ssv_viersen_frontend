import Image from "next/image"
import { DocumentData } from "firebase/firestore"

export interface FachschaftNavEntryProps {
    entry: DocumentData
    setCurrent: (current: number | null) => void
    currentId: number | null
}

export default function FachschaftNavEntry(props: FachschaftNavEntryProps) {
    return (
        <div
            // className={`flex flex-row items-start mx-auto font-bold text-xl hover:scale-125 transition-all ${props.entry.id == props.currentId ? 'text-blue-500 scale-150 hover:scale-150' : ''}`}
            // className={`grid grid-cols-6 mx-auto font-bold text-xl hover:scale-125 transition-all ${props.entry.id == props.currentId ? 'text-blue-500 scale-150 hover:scale-150' : ''}`}
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
            <h4 className="col-span-5 ml-4">
                {props.entry.data().name}
            </h4>
        </div>
    )
}