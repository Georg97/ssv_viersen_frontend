import { getPersonenForVerein } from "@/utils/Fachschaften";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import VereinInterface from "./VereinInterface";

export default function VereinDetail(props: VereinInterface) {
    const [personen, setPersonen] = useState<DocumentData[] | null>(null);

    useEffect(() => {
        async function getData() {
            const data = await getPersonenForVerein(props.fachschaftId, props.verein.id)
            setPersonen(data)
        }
        getData()
    }, [props.fachschaftId, props.verein.id])

    return (
        <div className='border-b-[1px] border-stone-500 py-4 grid grid-cols-2'>
            <h1 className="text-3xl font-bold mb-4 col-span-2 text-blue-500">{props.verein.data().name}</h1>
            {personen && personen.map(person => (
                <div key={person.name}>
                    <p className="text-xs p-0 m-0">{person.data().position}</p>
                    <h3 className="text-lg font-bold">{person.data().name}</h3>
                </div>
            ))}
        </div>
    )
}
