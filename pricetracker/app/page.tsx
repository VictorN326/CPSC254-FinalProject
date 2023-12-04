import Image from 'next/image'
import React from 'react'
import rightArrow from '@/public/rightarrow.svg'
import Searchbar from '@/components/Searchbar'
import ProductRotation from '@/components/ProductRotation'
import { getAllProductsFromDB } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'
const Home = async () => {
  const allProducts = await getAllProductsFromDB();
  return (
    <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              The start of your savings journey is here with us:
              <Image src={rightArrow} alt ='right-arrow' width={20} height={20} />
            </p>
            <h1 className='head-text'>
              Come and Try out <span className='text-green-400'>PriceTracker</span>
            </h1>
            <p className='mt-6'>The price of anything is the amount of life you exchange for it. We'll help make your life worth every penny!</p>
            
            <Searchbar />
          </div>
          
          <ProductRotation />
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending Items</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home