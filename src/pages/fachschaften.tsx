
import Head from "next/head"
import Fachschaften from "@/components/fachschaften/fachschaften"

export default function FachschaftenPage() {
    return (
        <>
            <Head>
                <title>SSV | Fachschaften</title>
            </Head>
            <div className="container mx-auto">
                <Fachschaften />
            </div>
        </>
    )
}