import Header from '@/components/nav/header'
import '@/styles/globals.css'
import { get_menu_entries } from '@/utils/menu'
import type { AppProps } from 'next/app'

export async function getStaticProps() {
    const menu_entries = JSON.parse(JSON.stringify(get_menu_entries()))
    return {
        props: {
            menu_entries
        }
    }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
        <Component {...pageProps} />
    </>
    )

}
