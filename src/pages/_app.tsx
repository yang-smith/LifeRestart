import '../styles/global.css';
import { PlayerAttributesProvider } from '../lib/PlayerAttributesContext';
// import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PlayerAttributesProvider>
            <Component {...pageProps} />
        </PlayerAttributesProvider>
    );
}

export default MyApp;
