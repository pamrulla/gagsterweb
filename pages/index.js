import Head from 'next/head';
import styles from '../styles/Home.module.scss'
import Navbar from "../components/Navbar";
import Cover from '../components/Cover';
import Gags from '../components/Gags';
import Footer from '../components/Footer';
export default function Home() {
  return (
    <>
    <Head>
        <title>Gagster</title>

        {/* Meta tags */}
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Raleway"
      rel="stylesheet"
    />
    </Head>
      <Navbar></Navbar>
      <Cover></Cover>
      <Gags></Gags>
      <Footer></Footer>
    </>
  )
}
