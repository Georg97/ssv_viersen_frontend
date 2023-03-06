import verein_interface from "./verein_interface";

export default function VereinDetail({verein}: {verein: verein_interface}) {
    return (
        <div className='border-b-[1px] border-stone-500 py-4 grid grid-cols-2'>
            <h1 className="text-3xl font-bold mb-4 col-span-2 text-blue-500">{verein.name}</h1>
            {verein.personen.map(person => (
                <div key={person.name}>
                    <p className="text-xs p-0 m-0">{person.positionsbezeichnung}</p>
                    <h3 className="text-lg font-bold">{person.name}</h3>
                </div>
            ))}
        </div>
    )
}
