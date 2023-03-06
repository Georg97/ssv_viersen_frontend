import Head from "next/head"
import Fachschaften from "@/components/fachschaften/fachschaften"

export default function FachschaftenPage() {
    return (
        <>
            <Head>
                <title>SSV | Fachschaften</title>
            </Head>
            <div className="mt-8 container mx-auto">
                <Fachschaften />
            </div>
        </>
    )
}
