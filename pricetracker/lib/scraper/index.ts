"use server"
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(productUrl: string) {
    if(!productUrl) return;

    const username = String(process.env.BRIGHTDATA_USERNAME);
    const password = String(process.env.BRIGHTDATA_PASSWORD);
    const port =22225;
    const session_id = (1000000 * Math.random()) | 0;
    

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        //Fetch Amazon product page

        const response = await axios.get(productUrl,options);
        const $ = cheerio.load(response.data);
        console.log(response.data);

        //grab the product title text or anything that is id as product title
        const title = $("#productTitle").text().trim();

        
        const currentPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('#priceblock_dealprice'),
            $('#priceblock_saleprice'),
            $('.a-offscreen'),
            $('.a-color-price'),
            $('.a-size-medium.a-color-price'),
            $('.a-size-base.a-color-price'),
            $('.a-size-mini.twisterSwatchPrice'),
            $('.a-size-base.a-color-base'),
            $('.a-size-medium.a-color-base'),
            $('.a-size-mini.a-color-base'),
            $('.a-size-base.a-color-secondary'),
            $('.a-size-medium.a-color-secondary'),
            $('.a-size-mini.a-color-secondary'),
            $('.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay')
        );
        
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price'),
            $('.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay')
        );
          

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        const image = $('#imgBlkFront').attr('data-a-dynamic-image') || 
        $('#landingImage').attr('data-a-dynamic-image') || '{}';

        const imageUrls = Object.keys(JSON.parse(image));
        const currency = extractCurrency($('.a-price-symbol'));

        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "")
        // console.log({title, currentPrice, originalPrice, outOfStock, imageUrls, currency, discountRate});

        const data = {
            productUrl,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars:4.5,
            isOutOfStock: outOfStock,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),

        }
        return data;
        // console.log(data);
    } catch (error:any) {
        throw new Error(`Failed to scrape the Amazon product: ${error.message}`)
    }

 }