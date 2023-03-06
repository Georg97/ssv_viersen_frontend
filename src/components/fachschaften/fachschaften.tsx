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

    // const handle_click = (target_id: number) => {

    // }

    return (
        <div className="flex flex-row">
            <div className="flex-initial w-1/4 flex-col gap-4 hidden sm:flex">
                <h3 className="text-4xl font-bold text-center">Fachschaft</h3>
                {fachschaften.map((entry) => (
                    <button key={entry.name} className={`btn mx-auto ${entry.id == current_id ? 'primary selected' : ''}`} onClick={() => setCurrent(entry.id)}>{entry.name}</button>
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
