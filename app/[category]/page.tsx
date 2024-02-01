import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData(cateogry: string) {
  const query = `*[_type == "product" && category->name == "${cateogry}"] {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name
      }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
                           <div key={product._id} className="group relative">
                           <Image
                          src={product.imageUrl}
                         alt="Product image"
                           className="w-full h-[300px] object-cover object-center transition-all duration-300 hover:scale-95 lg:h-[300px] lg:w-full rounded-b-none rounded-md"
                            width={300}
                           height={300}
                           />
       
                         <div className="mt-1">
                       <div>
                       <p className="mt-2 text-sm bg-primary px-2 text-white w-fit rounded-xl rounded-l-none">
                               {product.categoryName}
                             </p>
                           <h3 className="text-md font-medium text-black">
                             <Link href={`/product/${product.slug}`}>
                                {product.name}
                             </Link>
                         </h3>
                          
                           </div>
                          <p className="text-sm font-medium text-black mt-1">
                         $ {product.price}
                           </p>                            </div>
                      </div>
          ))}
        </div>
      </div>
    </div>
  );
}