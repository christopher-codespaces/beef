import { NavBar } from '@/components'
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
      <div>
         <NavBar />
      <Component {...pageProps} />
      </div>
  )
}
