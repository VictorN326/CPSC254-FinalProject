"use server";

import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { connectToMongoDB } from "../mongoose";
import Product from "../models/productModel";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailContent, sendEmail } from "../nodemailer";


export async function AmazonProductScrape(productUrl: string) {
   if(!productUrl) return;

   try {
    connectToMongoDB();
    const productScraped = await scrapeAmazonProduct(productUrl);
    if(!productScraped) return;

    let product = productScraped;

    //prevents adding same items to db
    const existProduct = await Product.findOne({url: productScraped.url});

    if(existProduct) {
      const updatedPriceHistory:any = [
        ...existProduct.priceHistory,
        {price: productScraped.currentPrice}
      ]

      product = {
        ...productScraped,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }
   const newProduct = await Product.findOneAndUpdate({url: productScraped.url}, product, {upsert: true, new: true}); 

   //page itself will change when values are being modified and doesn't get stuck in cache
   revalidatePath(`/products/${newProduct._id}`);

   } catch (error:any) {
     throw new Error(`Failed to update the product: ${error.message}`) 
   }
}

export async function getProductFromDB (productId: string) {
  try {
    connectToMongoDB();
    const product = await Product.findOne({_id:productId});
    if(!product) return null;
    return product;
  } catch (error:any) {
    throw new Error(`Failed to get product from DB: ${error.message}`)
  }
}


export async function getAllProductsFromDB() {
  try {
    connectToMongoDB();
    const products = await Product.find({});
    if(!products) return null;
    return products;
  } catch (error:any) {
    console.log('getAllProductsFromDB error', error.message);
  }
}


export async function addUserEmail(productId: string, userEmail: string) {
  try {
    const product = await Product.findById(productId);

    if(!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

    if(!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailContent(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}