import fachschaft_interface from "./fachschaft_interface";
import VereinDetail from "./verein_detail";

export default function FachschaftDetail({fachschaft}: {fachschaft: fachschaft_interface}) {
    return (
        <div className="grid grid-cols-2">
            <div>
                <h3>{fachschaft.fachwart}</h3>
            </div>
            <div className="flex flex-col">
                {fachschaft.vereine.map(verein => (
                    <VereinDetail verein={verein} key={verein.name}/>
                ))}
            </div>
        </div>
    )
}
