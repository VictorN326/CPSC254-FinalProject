import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductFromDB } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Modal from "@/components/Modal";
import React from "react";
//dynamic routing by id of product
type Props = {
  params: {
    id: string;
  };
};
const ProductInfo = async ({ params: { id } }: Props) => {
  const product: Product = await getProductFromDB(id);

  if (!product) redirect("/");

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            className="mx-auto"
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="product-reviews">
              <Image src="/comment.svg" alt="review" width={16} height={16} />
              <p className="text-sm text-secondary font-semibold">
                {product.reviewsCount} Reviews
              </p>
            </div>
            <p className="text-sm text-black opacity-50">
              <span className="text-primary-green font-semibold">95%</span> of
              buyers enjoyed this product! (87 votes)
            </p>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                icon="/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                icon="/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                icon="/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                icon="/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>
          <Modal productId={id} />
        </div>
      </div>
      <div className="flex flex-col gap-16"></div>
    </div>
  );
};

export default ProductInfo;
