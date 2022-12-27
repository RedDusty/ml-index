import 'styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';

export default function App({Component, pageProps}: AppProps) {
	
	// React.useEffect(() => {
	// 	if ('serviceWorker' in navigator) {
	// 		navigator.serviceWorker.register('/sw.js', {scope: '/'})
	// 			.then((reg) => {
	// 				console.log('SW: ', reg);
	// 		}).catch((err) => console.log(err));
	// 	}
	// }, []);

	return (
		<>
			<Head>
				<title>ML-Index</title>
				<link rel="shortcut icon" href="manifest/x192.png" type="image/png" />
				<link rel="manifest" href="manifest.json" />
				<meta name="application-name" content="ML-Index" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="ML-Index" />
				<meta name="description" content="ML-Index - view 3d models of heroes" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				{/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
				<meta name="msapplication-TileColor" content="#1e3a8a" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#ffccaa" />
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>

				<link rel="apple-touch-icon" href="manifest/x192.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="manifest/x152.png" />
				<link rel="apple-touch-icon" sizes="192x192" href="manifest/x192.png" />

				<link rel="icon" type="image/png" sizes="32x32" href="manifest/x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="manifest/x16.png" />
				<link rel="manifest" href="manifest.json" />
				{/* <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" /> */}
				<link rel="shortcut icon" href="manifest/x192.png" />
				{/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" /> */}

				{/* <meta name="twitter:card" content="summary" />
				<meta name="twitter:url" content="https://yourdomain.com" />
				<meta name="twitter:title" content="PWA App" />
				<meta name="twitter:description" content="Best PWA App in the world" />
				<meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
				<meta name="twitter:creator" content="@DavidWShadow" /> */}
				{/* <meta property="og:type" content="website" />
				<meta property="og:title" content="PWA App" />
				<meta property="og:description" content="Best PWA App in the world" />
				<meta property="og:site_name" content="PWA App" />
				<meta property="og:url" content="https://yourdomain.com" />
				<meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" /> */}
			</Head>
			<Component {...pageProps} />
		</>
	);
}
