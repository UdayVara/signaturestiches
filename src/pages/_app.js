import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NextNProgress from 'nextjs-progressbar';
import "../styles/scrollbar.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NextNProgress color='#ffffff' height={4} />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  </>
}
