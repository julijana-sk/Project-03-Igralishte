import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { BrandType, ProductType } from '@/types/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductItem from '@/components/ProductItem';
import Link from 'next/link';
import PageTitle from '@/components/PageTitle';

interface Props {
  brands: BrandType[];
  randomProducts: ProductType[]; 
  products: ProductType[];
  product: ProductType;
}

const ProductPage: NextPage<Props> = ({randomProducts, brands, product, products }) => {
    
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredBrands, setFeaturedBrands] = useState<BrandType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [brandedProducts, setBrandedProducts] = useState<ProductType[]>(randomProducts.slice(0, 6));
  const totalPages = Math.ceil(brands.length / 10);


    useEffect(() => {
        const indexOfLastProduct = currentPage * 10;
        const indexOfFirstProduct = indexOfLastProduct - 10;
        const currentProducts = brands.slice(indexOfFirstProduct, indexOfLastProduct);

            setFeaturedBrands(currentProducts);
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
      setBrandedProducts(randomProducts.slice(currentIndex - 6, currentIndex));
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 6 < randomProducts.length) {
      setCurrentIndex(currentIndex + 6);
      setBrandedProducts(randomProducts.slice(currentIndex + 6, currentIndex + 12));
    }
  };
  
  
  const filteredProducts = products?.filter((item) => {
        if (product.brand == item.brand){
          return true
        }
      })
    
  
     let foundBrand = brands?.find((brand) => brand.brand === product.brand);
    
    let foundBrandName = foundBrand ? foundBrand.name : 'Brand Not Found';


return (
    < >
        <Head>
            <title>Igralishte - Brand</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <div className="row d-flex flex-column justify-content-center">
          {product ? (
              <div className='col-11 mr-auto ml-auto my-5'>
                <div className="d-flex flex-row align-items-center align-self-center my-3 justify-content-start text-capitalize">
                  <img src="../pictures/icons/sparks-removebg.png" alt="spakrs" className="mr-2" />
                  <PageTitle title={foundBrandName}/>
                </div>
                    <img src={`${product.img}`} alt="picture of brand" className='col-12 p-0 text-center mb-4'/>
                      <p>Концептот на <span className='text-capitalize'>@{product.brand}_ </span> се базира на неколку прашања:</p>
                      <hr className='bg-transparent border-0'/>
                    <div className='col-11 p-0 ml-4'>
                      <p className='my-3 text-left'>{product.description}</p>
                    </div>
                      <p className='about-text text-left mb-5'>{`Погледнете ги производите на ${product.brand} кои ги нудиме во Игралиште. Имаме доста голем избор на Pussy привезоци кои се кул и ултра феминистички, а.к.а. grl pwr.`}</p>
                    <div className="container-fluid">
                      <div className="row flex-column">
                        <h3 className="text-center my-4">Парчиња од брендот:</h3>
                      <div className="row flex-row">
                        {filteredProducts?.map((product) => {
                          return (
                              <div className="col-5 p-0 mb-3 mr-2 product-img-small">
                                <ProductItem key={product.id} {...product}/>
                              </div>
                              )
                            })} 
                          <div className="col-12 text-center">
                            {filteredProducts?.length >= 6 && (
                              <div>
                                <button onClick={handlePrevClick}>{'<'}</button>
                                <button onClick={handleNextClick}>{'>'}</button>
                              </div>
                          )}
                        </div>
                    </div>
                  </div>
                </div>
                </div>
              ) : (
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
                        <Link href={`/brands?page=${currentPage -1}`} onClick={() => handleArrowClick('previous', currentPage)}>
                            {"<"}
                        </Link>
                        </button>
                        <button className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(pageNumber)}>{pageNumber}</button>
                        </>
                    ) : (
                        <button className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(pageNumber)}>{pageNumber} </button>
                    )}
                    
                    {i === totalPages - 1 ? (
                        <Link href={`/brands?page=${currentPage + 1}`} onClick={() => handleClick(currentPage + 1)}>
                            {">"}
                        </Link>
                    ) : null}
                </>
                );
            })}
        </div>
      </div>
    </div>
    </>
  ); 
};

export default ProductPage;


export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch('http://localhost:5001/products'); 
  const products: ProductType[] = await response.json();

  const paths = products.map((product: ProductType) => ({
      params: {
        id: product.id,
      },
    }));

  
  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  let product: ProductType | undefined;
  let randomNo: number | undefined;
  
  
  const res = await fetch('http://localhost:5001/brands'); 
  const brands: BrandType[] = await res.json();

  
  const response = await fetch('http://localhost:5001/products'); 
  const products: ProductType[] = await response.json();


  products.map(() => {
    if (products.length > 6) {
      randomNo = Math.floor(Math.random() * (products.length - 6));
    }
  });
  

  const resRandomProducts = await fetch(`http://localhost:5001/products?_start=${randomNo}&_limit=6`);
  const randomProducts: ProductType[] = await resRandomProducts.json();


  const  resProduct = await fetch(`http://localhost:5001/products/${params?.id}`);
  product = await resProduct.json();


  return {
    props: {
      product,
      products,
      brands,
      randomProducts

    },
  };
};