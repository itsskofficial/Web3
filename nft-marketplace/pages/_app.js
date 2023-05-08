import '../styles/globals.css'
import Navbar from '@components/Navbar/Navbar'
const App = ({ Component, pageProps }) => {
    return (
        <Navbar>
            <Component {...pageProps} />
        </Navbar>
    )
}

export default App