import { useState } from "react"
import fachschaft_inteface from "./fachschaft_interface"
import styles from './fachschaften.module.css'
import FachschaftDetail from "./fachschaft_detail"
import fachschaft_interface from "./fachschaft_interface"

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
        , name: 'KSG Oh-Do-Kwan e.V.'
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
        , name: 'KSG Oh-Do-Kwan e.V.'
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
        , name: 'KSG Oh-Do-Kwan e.V.'
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
        , name: 'KSG Oh-Do-Kwan e.V.'
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

    // const handle_click = (target_id: number) => {

    // }

    return (
        <div className="flex flex-row">
            {/* <div className="flex-auto flex flex-col gap-4 border-2 border-pink-500"> */}
            <div className="fachschaften-selection">
                {fachschaften.map((entry) => (
                    <button key={entry.name} className="text-center border-2 w-32 rounded-lg hover:scale-110 transition-all" onClick={() => setCurrent(entry.id)}>{entry.name}</button>
                ))}
            </div>
            {/* <div className="flex-auto border-pink-500 border-2"> */}
            <div className="fachschaft-details">
                {/* {current_id && (
                    <h1>{fachschaften.find(v => v.id == current_id)?.name}</h1>
                )} */}
                {current_id && fachschaften.find(v => v.id == current_id) && (
                    <FachschaftDetail fachschaft={ensure<fachschaft_interface>(fachschaften.find(v => v.id == current_id))} />
                    // <FachschaftDetail fachschaft={{id: 1, name: 'fachschaft', fachwart: 'fachwarttest'}} />
                )}
            </div>
        </div>
    )
}
