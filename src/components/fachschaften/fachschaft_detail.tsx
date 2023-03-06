import fachschaft_interface from "./fachschaft_interface";
import VereinDetail from "./verein_detail";

export default function FachschaftDetail({fachschaft}: {fachschaft: fachschaft_interface}) {
    return (
        <div className="grid grid-cols-3">
            <h3 className="col-span-1 text-4xl text-blue-500 border-b-2 border-stone-900 dark:border-stone-300 font-bold">Fachwart</h3>
            <h3 className="col-span-2 text-4xl text-blue-500 border-b-2 border-stone-900 dark:border-stone-300 font-bold">Vereine</h3>
            <h3 className="text-2xl col-span-1">{fachschaft.fachwart}</h3>
            <div className="flex flex-col col-span-2">
                {fachschaft.vereine.map(verein => (
                    <VereinDetail verein={verein} key={verein.name}/>
                ))}
            </div>
        </div>
    )
}
