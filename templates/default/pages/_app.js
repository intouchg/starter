import Head from 'next/head'
import GlobalStyles from '@/components/GlobalStyles'

const App = ({ Component, pageProps }) => (
	<>
		<Head>
			<title>Placeholder Title</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
			<meta name="description" content="Placeholder description" />
			<link rel="icon" type="image/svg+xml" href="/icon.svg" />
		</Head>
		<GlobalStyles />
		<Component {...pageProps} />
	</>
)

export default App
