import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Caraousel from '@/components/Caraousel'
import Card from '@/components/Card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Signature Stiches - Home</title>
        <meta name="description" content="Get outfit of your choice for everyone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Caraousel />

      <h2 className="text-center mt-5 mb-4">Shop T-shirts</h2>

      <div className="container-fluid mb-5">
        <div className="d-flex flex-row g-4 ps-md-3" style={{ overflowX: "scroll", gap: "30px" }}>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691154228_6986882.jpg?format=webp&w=480&dpr=1.3" title="Naruto: Itachi Uchiha" category="T-shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1690357179_3338624.jpg?format=webp&w=480&dpr=1.3" title="Truck Art: Black Panther " category="T-shirts" />
          </div>


          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1681572930_2754166.jpg?format=webp&w=480&dpr=1.3" title="Truck Art: Doctor Strange" category="T-shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1678691684_2130824.jpg?format=webp&w=480&dpr=1.3" title="Marvel: Logo" category="T-shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1687606804_1731796.jpg?format=webp&w=480&dpr=1.3" title="Spider-Man: The Web" category="T-shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1655464347_1027796.jpg?format=webp&w=480&dpr=1.3" title="Superman: Vintage Logo" category="T-shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1689049642_6530188.jpg?format=webp&w=480&dpr=1.3" title="Looney Tunes: Fitness" category="T-shirts" />
          </div>

        </div>
      </div>

      <h2 className="text-center mt-5 mb-3">Shop Shirts</h2>
      <div className="container-fluid mb-5">
        <div className="d-flex flex-row g-4 ps-md-3" style={{ overflowX: "scroll", gap: "30px" }}>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691213490_9958577.jpg?format=webp&w=300&dpr=1.3" title="Texture Shirt : Black" category="Shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1688385967_5148386.jpg?format=webp&w=300&dpr=1.3" title="Spider-Man: Miles And Gwen   " category="T-shirts" />
          </div>


          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1681973386_2223955.jpg?format=webp&w=300&dpr=1.3" title="Plaid : Green and Blue" category="Shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1687005964_8407205.jpg?format=webp&w=300&dpr=1.3" title="Marvel: Deadpool" category="Shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691215917_3725178.jpg?format=webp&w=300&dpr=1.3" title="Solids : Light blue" category="Shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1667975054_8076235.jpg?format=webp&w=300&dpr=1.3" title="Formal : Black " category="Shirts" />
          </div>
          <div className="flex-shrink-0">
            <Card image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1618587212_2441670.jpg?format=webp&w=300&dpr=1.3" title="Batman : The Dark Knight" category="Shirts" />
          </div>

        </div>
      </div>
    </>
  )
}
