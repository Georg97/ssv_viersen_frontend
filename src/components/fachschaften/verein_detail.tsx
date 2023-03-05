import verein_interface from "./verein_interface";

export default function VereinDetail({verein}: {verein: verein_interface}) {
    return (
        <div>
            <h1>{verein.name}</h1>
            {verein.personen.map(person => (
                <h3 key={person.name}>{person.name}</h3>
            ))}
        </div>
    )
}
