import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PricingLogo from '../public/pricing.png'
const Navbar = () => {
  return (
    //Our Logo and Icon
    <header className='w-full'>
      <nav className='nav'>
        <Link href='/' className='flex items-center gap-1'> 
          <Image src={PricingLogo} alt='logo' width={27} height={27} />

          <p>
            <span className='text-green-400'>Price</span>Tracker
          </p>
        </Link>
        <div className='flex items-center gap-5'>
          {/* Will add the login clerk button here for authentication */}
        </div>
      </nav>
    </header>
  )
}

export default Navbar