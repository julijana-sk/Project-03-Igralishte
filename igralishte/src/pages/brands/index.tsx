import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { ProductType } from '@/types/types';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import BrandItem from '@/components/Brands';
import ProductItem from '@/components/ProductItem';
import Link from 'next/link';

interface Props {
  products: ProductType[];
  allProducts: ProductType[];
  searchedBrandsData: ProductType[];
}

const ProductPage: NextPage<Props> = ({allProducts, searchedBrandsData }) => {
    
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [brandedProducts, setBrandedProducts] = useState(searchedBrandsData.slice(0, 6));
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);

  const totalPages = Math.ceil(allProducts.length / 10);

    useEffect(() => {
        const indexOfLastProduct = currentPage * 10;
        const indexOfFirstProduct = indexOfLastProduct - 10;
        const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

        setProducts(currentProducts);
    }, [currentPage]);

    const handleArrowClick = (direction: string, clickedPage: any) => {
        if (direction === 'previous') {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(currentPage + 1);
        }
        handleClick(clickedPage);
    };

    const handleClick = (pageNumber: number) => {
     if (pageNumber === currentPage) {
        return;
        }
        setCurrentPage(pageNumber);
    };

    
    
      
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 6);
      setBrandedProducts(searchedBrandsData.slice(currentIndex - 6, currentIndex));
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 6 < searchedBrandsData.length) {
      setCurrentIndex(currentIndex + 6);
      setBrandedProducts(searchedBrandsData.slice(currentIndex + 6, currentIndex + 12));
    }
  };
  

  


return (
    < >
        <Head>
            <title>Igralishte - Brand</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <div className="row d-flex flex-column justify-content-center">
            <div className='col-11 mr-auto ml-auto my-5'>
            {searchedBrandsData.length > 0 ? ( searchedBrandsData.map((brand) => {
            // treba da go prikazuva SAMO brendot kojsto odgovara na linkot !! ?? sporedi spored URL ?
            //   http://localhost:3000/brands?brand=nezno
            // {searchedBrandsData.length > 0 ? ( searchedBrandsData.find((brand) => {
                // if (router.query.id === brand.id) {
              return (
                <div>
                    <BrandItem  brand={brand} />
                    <p className='about-text text-left mb-5'>{`Погледнете ги производите на ${brand.name} кои ги нудиме во Игралиште. Имаме доста голем избор на Pussy привезоци кои се кул и ултра феминистички, а.к.а. grl pwr.`}</p>
                    
                    <h2 className='mb-4'>Парчиња од брендот:</h2>  


                    <div className='col-11 mr-auto ml-auto my-5'>
            {/* treba da go prikazuva SAMO brendot kojsto odgovara od pogore izbranoto !?!??! */}

                      {searchedBrandsData.length > 0 ? (
                        searchedBrandsData.map((product) => (
                          <div key={product.id} >
                            <ProductItem {...product}/>
                          </div>
                        ))
                      ) : (
                        <p>There are no results...</p>
                      )}
                      
                      {searchedBrandsData.length > 6 && (
                        <div>
                          <button onClick={handlePrevClick}>{'<'}</button>
                          <button onClick={handleNextClick}>{'>'}</button>
                        </div>
                      )}
                    </div>
                  </div>
                  )
                  })) : (
                  <p>There are no results...</p>
                )}
                
            {/* pagination  */}
          <div className="text-center mb-5" style={{letterSpacing: "3px"}}>
            {[...Array(totalPages)].map((_, i) => {
              
              const pageNumber = i + 1;
              const isActive = (pageNumber === currentPage) ? "text-danger" : "text-dark";
            return (
                <>
                    {i === 0 ? (
                        <>
                        <button className="bg-transparent border-0 font-weight-bold" >
                        <Link href={`/products?page=${currentPage -1}`} onClick={() => handleArrowClick('previous', currentPage)}>
                            {"<"}
                        </Link>
                        </button>
                        <button className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(pageNumber)}>{pageNumber}</button>
                        </>
                    ) : (
                        <button className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(pageNumber)}>{pageNumber} </button>
                    )}
                    
                    {i === totalPages - 1 ? (
                        <Link href={`/products?page=${currentPage + 1}`} onClick={() => handleClick(currentPage + 1)}>
                            {">"}
                        </Link>
                    ) : null}
                </>
                );
            })}
        </div>
        </div>
      </div>
    </div>
    </>
  ); 
};

export default ProductPage;


export const getServerSideProps: GetServerSideProps = async ({query}) => {
    
const page = parseInt(query.page as string, 10) || 1;

const resClothes = await fetch(`http://localhost:5001/vintageClothes?page=${page}`);
const vintageClothes: SubcategoryType[] = await resClothes.json();

const resAccessories = await fetch(`http://localhost:5001/accessories?page=${page}`);
const accessories: SubcategoryType[] = await resAccessories.json();


const response = await fetch(`http://localhost:5001?page=${page}`);
const products: ProductType[] = await response.json();

let resSearchedBrands: Response;

  if (query.brand && query.query) {
    resSearchedBrands = await fetch(
      `http://localhost:5001/brands?gender_like=${query.brand}&q=${query.query}`
    );
  } else if (query.brand) {
    resSearchedBrands = await fetch(
      `http://localhost:5001/brands?gender_like=${query.brand}`
    );
  } else if (query.query) {
    resSearchedBrands = await fetch(
      `http://localhost:5001/brands?q=${query.query}`
    );
  }  else {
    resSearchedBrands = await fetch("http://localhost:5001/brands");
  }

  const searchedBrandsData: ProductType[] = await resSearchedBrands.json();



let allproducts: ProductType[] = []


    vintageClothes.forEach((category: SubcategoryType) => {
        Object.values(category).forEach((productList: ProductType[]) => {
            productList.forEach((product: ProductType) => {
            if (allproducts.length <= 10 && product.id) {
                allproducts?.push(product);
            } else {
                return;
            }
            });
        });
    });

    accessories.forEach((accessory: SubcategoryType) => {
        Object.values(accessory).forEach((product: ProductType) => {
            if (allproducts.length <= 10 && product.id) {
            allproducts?.push(product);
            } else {
            return;
            }
        });
    });
    

  return {
      props: {
        products,
        allroducts,
        vintageClothes,
        accessories,
        searchedBrandsData,
        page
      },
    }
}
