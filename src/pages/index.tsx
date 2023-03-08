import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import { get_menu_entries } from '@/utils/menu'
import Nav from '@/components/nav/nav'
import { nav_item_interface } from '@/components/nav/nav_item_interface'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    const menu_entries = JSON.parse(JSON.stringify(get_menu_entries()))
    return {
        props: {
            menu_entries
        }
    }
}

export default function Home({menu_entries}: {menu_entries: nav_item_interface[]}) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* <button className="text-red-400">test</button> */}
                <h1 className="text-center text-6xl mt-8 mb-24 font-bold">Stadtsportverband Viersen</h1>
                <h3 className="w-8/12 text-center mx-auto text-2xl">Willkommen auf der neuen Seite vom Stadtsportverband Viersen! <br></br><br></br></h3>
                <p className="w-8/12 text-center mx-auto text-lg">Hier ist noch nicht viel zu sehen, allerdings könnt ihr oben bereits auf die <Link href='/fachschaften' className="link">Fachschaften</Link> klicken. Bald werden noch weitere Informationen folgen!</p>
            </main>
        </>
    )
}
