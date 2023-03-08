import { useEffect, useState } from "react"
import fachschaft_inteface from "./fachschaft_interface"
import styles from './fachschaften.module.css'
import FachschaftDetail from "./fachschaft_detail"
import fachschaft_interface from "./fachschaft_interface"
import fachschaft_strapi from "./fachschaft_strapi"
import axios from "axios"

const list: fachschaft_inteface[] = [
    {
      id: 1
    , name: 'Taekwondo'
    , fachwart: 'Nik Fuchs'
    , vereine: [
      {
          id: 1
        , name: 'KSG Oh-Do-Kwan e.V.'
        , personen: [
          {
              positionsbezeichnung: '1. Vorsitzender'
            , name: 'Thomas Schneider'
          },
          {
              positionsbezeichnung: '2. Vorsitzender'
            , name: 'Reinhard Peters'
          },
          {
              positionsbezeichnung: 'Kassenwart'
            , name: 'Reinhard Peters'
          },
          {
              positionsbezeichnung: 'Jugendwart'
            , name: 'Georg Hirsch'
          },
          {
              positionsbezeichnung: '2. Jugendwart'
            , name: 'Elias Eliktissadi'
          }
        ]
      },
      {
          id: 6
        , name: 'Taekwondo Verein 2'
        , personen: [
          {
              positionsbezeichnung: '1. Vorsitzender'
            , name: 'Guido'
          }
        ]
      }
    ]
    }, {
      id: 2
    , name: 'Fußball'
    , fachwart: 'Max Mustermann'
    , vereine: [
      {
          id: 1
        , name: 'SG Dülken e.V.'
        , personen: [
          {
              positionsbezeichnung: '1. Vorsitzender'
            , name: 'Urs Müller'
          }
        ]
      }
    ]
    }, {
      id: 3
    , name: 'Tennis'
    , fachwart: 'Uwe Müller'
    , vereine: [
      {
          id: 1
        , name: 'Tennisclub Viersen e.V.'
        , personen: [
          {
              positionsbezeichnung: '1. Vorsitzender'
            , name: 'Kai Harald'
          }
        ]
      }
    ]
    }, {
      id: 4
    , name: 'Tischtennis'
    , fachwart: 'Peter Heinrich'
    , vereine: [
      {
          id: 1
        , name: 'Ballklopper e.V.'
        , personen: [
          {
              positionsbezeichnung: '1. Vorsitzender'
            , name: 'Jessica Anders'
          }
        ]
      }
    ]
    }, {
      id: 5
    , name: 'Hockey'
    , fachwart: 'Karl Schuster'
    , vereine: [
      {
          id: 1
        , name: 'Pukmeister e.V.'
        , personen: [
          {
              positionsbezeichnung: '1. Vorsitzender'
            , name: 'Adrian Kammfeld'
          }
        ]
      }
    ]
    }
]

function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export default function Fachschaften() {
    const [fachschaften, setFachschaften] = useState<fachschaft_inteface[]>(list)
    const [current_id, setCurrent] = useState<number | null>(null)
    // const [fachschaftenStrapi, setFachschaftenStrapi] = useState<fachschaft_strapi>()

    // useEffect(() => {
    //   axios.get<fachschaft_strapi>('https://www.gft-international.de/strapi/api/fachschafts')
    //        .then(response => {
    //         setFachschaftenStrapi(response.data)
    //        })
    // }, [])

    return (
        <div className="flex flex-row">
          {/* {fachschaftenStrapi && fachschaftenStrapi.data.map(entry => (
            <p key={entry.id}>{entry.attributes.name}</p>
          ))} */}
            <div className="flex-initial w-1/4 flex-col gap-4 hidden sm:flex">
                <h3 className="text-4xl font-bold text-center">Fachschaft</h3>
                {fachschaften.map((entry) => (
                    <button key={entry.name} className={`mx-auto font-bold text-xl hover:scale-125 transition-all ${entry.id == current_id ? 'text-blue-500 scale-150 hover:scale-150' : ''}`} onClick={() => setCurrent(entry.id)}>{entry.name}</button>
                ))}
            </div>
            <div className="flex-initial w-3/4">
                {current_id && fachschaften.find(v => v.id == current_id) && (
                    <FachschaftDetail fachschaft={ensure<fachschaft_interface>(fachschaften.find(v => v.id == current_id))} />
                )}
            </div>
        </div>
    )
}
