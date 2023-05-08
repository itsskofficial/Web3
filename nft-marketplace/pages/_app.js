import '../styles/globals.css'
import Navbar from '@components/Navbar/Navbar'
const App = ({ Component, pageProps }) => {
    return (
        <Navbar></Navbar>
        <Component {...pageProps} />
    )
}

export default App