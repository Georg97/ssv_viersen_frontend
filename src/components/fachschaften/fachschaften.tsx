import { useEffect, useState } from "react"
import fachschaft_inteface from "./FachschaftInterface"
import styles from './fachschaften.module.css'
import FachschaftDetail from "./FachschaftDetail"
import fachschaft_interface from "./FachschaftInterface"
import fachschaft_strapi from "./fachschaft_strapi"
import axios from "axios"

function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { getFachschaften } from "@/utils/Fachschaften"
import { get } from "https"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { Fahkwang } from "next/font/google"
import FachschaftNavEntry from "./FachschaftNavEntry"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import AddFachschaftButton from "./AddFachschaftButton"

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { data } = await  getFachschaften()

//   return {
//     props: {
//       fachschaften: data
//     }
//   }
// }
// function useFachschaften() {
//   const fachschaften = await getFachschaften()
//   return fachschaften
// }

// export default function Fachschaften({fachschaften}: {fachschaften: DocumentData[]}) {
export default function Fachschaften() {
    const user = useAuthState(auth)
    const [current_id, setCurrent] = useState<number | null>(null)
    // const [isEditting, setIsEditting] = useState(false);

    const [fachschaften, setFachschaften] = useState<DocumentData[] | null>(null);
    useEffect(() => {
        async function getData() {
            const data = await getFachschaften()
            setFachschaften(data)
        }
        getData()
    }, [])

    return (
        <div className="flex flex-row">
            <div className="flex-initial w-1/4 flex-col gap-4 hidden md:flex">
                <h3 className="text-4xl font-bold text-center">Fachschaft</h3>
                {fachschaften && fachschaften.map((entry) => (
                    <FachschaftNavEntry
                        key={entry.id}
                        entry={entry}
                        setCurrent={setCurrent}
                        currentId={current_id}
                    // setIsEditting={setIsEditting}
                    // isEditing={isEditting}
                    />
                ))}
                {user[0] && (
                    <AddFachschaftButton />
                )}
            </div>
            <div className="flex-initial w-3/4">
                {current_id && fachschaften?.find(v => v.id == current_id) && (
                    <FachschaftDetail fachschaft={ensure<DocumentData>(fachschaften.find(v => v.id == current_id))} />
                )}
            </div>
        </div>
    )
}
