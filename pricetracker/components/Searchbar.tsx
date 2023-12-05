"use client"
import { AmazonProductScrape } from '@/lib/actions';
import React, {FormEvent, useState} from 'react'

const isValidAmazonUrl = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
      return true;
    }
  } catch (error) {
    return false;
    // console.log('@components/Searchbar: ',error);
  }
  return false;
}
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const[isLoading, setIsLoading] = useState(false)
  const  handleSubmit =  async (event: FormEvent<HTMLFormElement>) => {
    // prevents our app from refreshing every time we submit the form as default behavior
    event.preventDefault();

    const isValidUrl = isValidAmazonUrl(searchTerm);

    if(!isValidUrl) {
      return(alert('Please enter a valid Amazon product link'));
    }

    try {
      setIsLoading(true);
      const product = await AmazonProductScrape(searchTerm);
    } catch (error) {
        console.log('@components/Searchbar: ', error);
    } finally {
      setIsLoading(false);
    
    }
  }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter a Amazon product link' value={searchTerm} onChange={(event)=> setSearchTerm(event.target.value)} className='searchbar-input' />
        <button type='submit' className='searchbar-btn' disabled={searchTerm ===''}>{isLoading? "Searching...": 'Search'}</button>
    </form>
  )
}

export default Searchbar