import {cert, getApp, getApps, initializeApp} from 'firebase-admin/app';

const service_account = process.env.service_account;

if (service_account === undefined) throw new Error('FB Key error');

const service_account_key = JSON.parse(Buffer.from(service_account, 'base64').toString('ascii'));

export const firebase = getApps().length ? getApp() : initializeApp({
	credential: cert(service_account_key),
	storageBucket: 'ml-index-m.appspot.com'
});

// function initApp() {
// 	const app = ;

// 	const a = getStorage(app).bucket().setCorsConfiguration([{
// 		origin: ['*'],
// 		method: ['GET'],
// 		maxAgeSeconds: 3600
// 	}]);

// 	b(a);
	
// 	return app;
// }

// async function b(a: any) {
// 	console.log(await a);
// }
