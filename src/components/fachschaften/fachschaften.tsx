import { useState } from "react"
import { fachschaft } from "./t_fachschaft"

const list = [
      new fachschaft(1, 'Taekwondo', 'Nik Fuchs')
    , new fachschaft(2, 'Fußball', 'Max Mustermann')
    , new fachschaft(3, 'Tennis', 'Uwe Müller')
    , new fachschaft(4, 'Tischtennis', 'Peter Heinrich')
    , new fachschaft(5, 'Hockey', 'Karl Schuster')
]

export default function Fachschaften() {
    const [fachschaften, setFachschaften] = useState<fachschaft[]>(list)
    const [current_id, setCurrent] = useState<number | null>(null)

    // const handle_click = (target_id: number) => {

    // }

    return (
        <div className="flex flex-row">
            <div className="flex-auto flex flex-col gap-4">
                {fachschaften.map((entry) => (
                    <button className="text-center border-2 w-32 rounded-lg hover:scale-110 transition-all" onClick={() => setCurrent(entry.id)}>{entry.name}</button>
                ))}
            </div>
            <div className="flex-auto">
                {current_id && (
                    <h1>{fachschaften.find(v => v.id == current_id)?.name}</h1>
                )}
            </div>
        </div>
    )
}
