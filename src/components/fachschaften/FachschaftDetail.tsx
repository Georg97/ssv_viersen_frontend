import { getVereineForFachschaft } from "@/utils/Fachschaften";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import FachschaftInterface from "./FachschaftInterface";
import VereinDetail from "./verein_detail";

export default function FachschaftDetail(props: FachschaftInterface) {
    const [vereine, setVereine] = useState<DocumentData[] | null>(null);

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
            {/* <h3 className="text-2xl col-span-1">{fachschaft.fachwart}</h3> */}
            <h3 className="text-2xl col-span-1">{props.fachschaft.data().fachwart}</h3>
            <div className="flex flex-col col-span-2">
                {/* {fachschaft.vereine.map(verein => (
                    <VereinDetail verein={verein} key={verein.name}/>
                ))} */}
                {vereine && vereine.map(verein => (
                    <VereinDetail fachschaftId={props.fachschaft.id} verein={verein} key={verein.id} />
                ))}
            </div>
        </div>
    )
}
