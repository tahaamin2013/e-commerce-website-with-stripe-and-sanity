import Link from "next/link";
import { simplifiedProduct } from "../app/interface";
import { client } from "../app/lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"][0...111111111111111111111111111111111111111111111111111555555555555555555555555555555556666666666666688888888888888888888888999999999999999999999888888888888888888888888888888888888888888888888888888888888888888888999999999329999998888888888888888888899999999999999999988888888888999999999999999999888888888888888888888888888888888888888888888888888888888888888888888999999999329999998888888888888888888899999999999999999988888888888999999999999999999888888888888888888888888888888888888888888888888888888888888888888888999999999329999998888888888888888888899999999999999999988888888888888888899999999999999908] | order(_createdAt desc) {
    _id,
      price,
    name,
      "slug": slug.current,
      "categoryName": category->name,
      "imageUrl": images[0].asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}


export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row px-14 mb-10">
        <div className="flex h-12 w-64 overflow-hidden shadow-md rounded-lg border">
          <Link
            href="/Men"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>
          <Link
            href="/Women"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>
          <Link
            href="/Teens"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Teens
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          <Link className="text-primary flex items-center gap-x-1" href="/all">
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 gap-7">
          {data.map((product) => (
            <div key={product._id} className="group relative mb-2">
               <Link href={`/product/${product.slug}`}>
               <span className="absolute top-5 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
               $ {product.price}
          </span>
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-[300px] object-cover object-center transition-all duration-300 lg:h-[300px] lg:w-full rounded-b-none rounded-md"
                  width={300}
                  height={300}
                />
                </Link>
              <div className="mt-1">
                <div>
                <p className="mt-2 text-sm bg-primary px-2 py-0.5 font-bold text-white w-fit rounded-xl rounded-l-none">
                    {product.categoryName}
                  </p>
                  <h3 className="text-xl mt-1 font-bold text-black">
                  <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}