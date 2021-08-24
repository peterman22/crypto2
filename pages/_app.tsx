import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import axios from 'axios';

const baseUrl = `http://localhost:4000`;

// axios.interceptors.request.use(
//   request => {
//     if (request.url?.startsWith('/')) request.url = `${baseUrl}${request.url}`;
//     request.url = `${baseUrl}/${request.url}`;

//     return request;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// )

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp;
