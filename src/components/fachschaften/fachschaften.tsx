import { useEffect, useState } from "react"
import fachschaft_inteface from "./fachschaft_interface"
import styles from './fachschaften.module.css'
import FachschaftDetail from "./fachschaft_detail"
import fachschaft_interface from "./fachschaft_interface"
import fachschaft_strapi from "./fachschaft_strapi"
import axios from "axios"

// const list: fachschaft_inteface[] = [
//     {
//       id: 1
//     , name: 'Taekwondo'
//     , fachwart: 'Nik Fuchs'
//     , vereine: [
//       {
//           id: 1
//         , name: 'KSG Oh-Do-Kwan e.V.'
//         , personen: [
//           {
//               positionsbezeichnung: '1. Vorsitzender'
//             , name: 'Thomas Schneider'
//           },
//           {
//               positionsbezeichnung: '2. Vorsitzender'
//             , name: 'Reinhard Peters'
//           },
//           {
//               positionsbezeichnung: 'Kassenwart'
//             , name: 'Reinhard Peters'
//           },
//           {
//               positionsbezeichnung: 'Jugendwart'
//             , name: 'Georg Hirsch'
//           },
//           {
//               positionsbezeichnung: '2. Jugendwart'
//             , name: 'Elias Eliktissadi'
//           }
//         ]
//       },
//       {
//           id: 6
//         , name: 'Taekwondo Verein 2'
//         , personen: [
//           {
//               positionsbezeichnung: '1. Vorsitzender'
//             , name: 'Guido'
//           }
//         ]
//       }
//     ]
//     }, {
//       id: 2
//     , name: 'Fußball'
//     , fachwart: 'Max Mustermann'
//     , vereine: [
//       {
//           id: 1
//         , name: 'SG Dülken e.V.'
//         , personen: [
//           {
//               positionsbezeichnung: '1. Vorsitzender'
//             , name: 'Urs Müller'
//           }
//         ]
//       }
//     ]
//     }, {
//       id: 3
//     , name: 'Tennis'
//     , fachwart: 'Uwe Müller'
//     , vereine: [
//       {
//           id: 1
//         , name: 'Tennisclub Viersen e.V.'
//         , personen: [
//           {
//               positionsbezeichnung: '1. Vorsitzender'
//             , name: 'Kai Harald'
//           }
//         ]
//       }
//     ]
//     }, {
//       id: 4
//     , name: 'Tischtennis'
//     , fachwart: 'Peter Heinrich'
//     , vereine: [
//       {
//           id: 1
//         , name: 'Ballklopper e.V.'
//         , personen: [
//           {
//               positionsbezeichnung: '1. Vorsitzender'
//             , name: 'Jessica Anders'
//           }
//         ]
//       }
//     ]
//     }, {
//       id: 5
//     , name: 'Hockey'
//     , fachwart: 'Karl Schuster'
//     , vereine: [
//       {
//           id: 1
//         , name: 'Pukmeister e.V.'
//         , personen: [
//           {
//               positionsbezeichnung: '1. Vorsitzender'
//             , name: 'Adrian Kammfeld'
//           }
//         ]
//       }
//     ]
//     }
// ]

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
                    <button className="btn w-fit mx-auto px-2 text-xl font-bold hover:scale-110 mt-8">
                        <span className="border-r-2 mr-1 pr-1">+</span>
                        Fachschaft hinzufügen
                    </button>
                )}
            </div>
            <div className="flex-initial w-3/4">
                {/* {current_id && fachschaften.find(v => v.id == current_id) && (
                    <FachschaftDetail fachschaft={ensure<fachschaft_interface>(fachschaften.find(v => v.id == current_id))} />
                )} */}
            </div>
        </div>
    )
}
