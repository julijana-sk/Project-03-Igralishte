import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { BoxComponentType, DataType, ProductType } from '@/types/types';
import Head from 'next/head';
import PageTitle from '@/components/PageTitle';
import AmountOfProduct from '@/components/AmountOfProduct';
import BoxComponent from '@/components/BoxComponent';
import PrimaryBtn from '@/components/PrimaryBtn';
import RelatedProducts from '@/components/RelatedProducts';
import Link from 'next/link';



interface Props {
  product: ProductType;
  products: DataType["products"];
  allProducts: ProductType[];
  randomProducts: ProductType[];
  boxItemsData: BoxComponentType[];
}

const ProductDetailPage: NextPage<Props> = ({ product, allProducts, boxItemsData, randomProducts }) => {

  // const { useFetchAllProducts, addToCard} = useContext(UserContext);

  const router = useRouter();
  const [expandedBox, setExpandedBox] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allProducts.length / 10);
  
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  const [isAddToCard, setIsAddToCard] = useState(false);
  // const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

 

 const toggleFavorite = (id: any) => {
    const updatedFavorites = isFavorite
      ? favorites.filter((favId: any) => favId !== id)
      : [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
};

  const handleBoxClick = (box: any) => {
    setExpandedBox(box === expandedBox ? null : box);
  }


  // const clickProduct = (prod: ProductType) => {
  //   const updatedProducts = products.map((p) => {
  //     if (p.id === prod.id) {
  //       return {
  //         ...p,
  //         selected: !p.selected,
  //         amount: p.selected ? 0 : 1,
  //       };
  //     }
  //     return p;
  //   });
  //   setProducts(updatedProducts);
  // };


   const addToCard = (prod: ProductType) => {
    const updatedAllProducts = products.map((p) => {
      if (p.id === prod.id) {
        return {
          ...p,
          selected: !p.selected,
          amount: p.selected ? 0 : 1,
        };
      }
      return p;
    });
    setProducts(updatedAllProducts);
  };


  const placeOrder = () => {
    const updatedState = products.map((p) => {
      return {
        ...p,
        selected: false,
        amount: 0,
      };
    });
    setProducts(updatedState);
  };

  const onAddItem = (prod: ProductType) => {
    setProducts((prevState) => {
      return prevState.map((p) => {
        if (p.id === prod.id) {
          return {
            ...p,
            amount: p.amount + 1,
          };
        }
        return p;
      });
    });
  };

  const onRemoveItem = (prod: ProductType) => {
    if (prod.amount === 1) {
      setProducts((prevState) => {
        return prevState.map((p) => {
          if (p.id === prod.id) {
            return {
              ...p,
              selected: false,
              amount: 0,
            };
          }
          return p;
        });
      });
    } else {
      setProducts((prevState) => {
        return prevState.map((p) => {
          if (p.id === prod.id) {
            return {
              ...p,
              amount: p.amount - 1,
            };
          }
          return p;
        });
      });
    }
  };


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

  
  return (
    <>
      <Head>
        <title>Igralishte - Product Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={product.title} />

        <div className="container-fluid my-5">
          <div className="row d-flex flex-column justify-content-center">
            <div className="col-12 mb-5">
                <h4 className="text-center">{product.title}</h4>
                <img src={`${product.img}`}/>
                <div className='flex-column add-to-card-fixed'>
                  {/* <Link href={"/"} className="nav-link d-flex flex-row justify-content-start"> */}
                    <button className="menu-footer-button mb-3"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                            event.preventDefault();
                            toggleFavorite(product.id);
                          }}
                    ><img src="../pictures/icons/heart-straight-thin.png" /></button>
                  {/* </Link> */}
                  {/* <Link href={"/"} className="nav-link d-flex flex-row justify-content-start"> */}
                    <button className="menu-footer-button"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                            event.preventDefault();
                            // toggleAddToCard(product.id);
                          }}
                    ><img src="../pictures/icons/shopping cart.png" /></button>
                  {/* </Link> */}
                </div>
                <span className="text-center">{product.price}</span>
                <p className="text-left">{product.description}</p>
                <AmountOfProduct
                      key={product.id}
                      product={product}
                      onMinusClick={onRemoveItem}
                      onPlusClick={onAddItem}
                    />
                <PrimaryBtn onClick={() => addToCard(product)} title="Додај во кошничка" btnClass={"PrimaryBtn w-75 giftBtnHover"} backgroundColor={"linear-gradient(0deg, #FFDBDB, #FFDBDB)"} color='black' height={"41px"} border='1.8px solid #C2C2C2'/>
                <i
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault();
                    toggleFavorite(product.id);
                  }}
                  // className={isFavorite && selectedRestaurantId === product.id ? "fas fa-heart fa-3x" : "far fa-heart fa-3x"}
                  className={isFavorite ? "fas fa-heart fa-3x" : "far fa-heart fa-3x"}
                ></i>
                <hr />
                <p>Size: {product.model_size}</p>
                <p>Size description????????</p>
                <p>Size dimension link?????</p>
                <p>Color: {product.color}</p>
                <p>Material: {product.material}</p>
                <p>Condition and read more about condition link????: {product.condition}</p>

                <p>Мaintenance guidelines: {product.care_instructions}</p>
                <p>Product tags: ??????? Treba da prebaram kako se pravat{product.category} {product.brand} {product.color}</p>
            </div>

          {/* Box Component Item  */}
          {boxItemsData.map((boxItem, index) => {
            return (
              <BoxComponent key={index} boxItem={boxItem} onClick={() => handleBoxClick(boxItem)} expanded={boxItem === expandedBox}/>
            )
          })}

           {/* Other Related Product Items  */}
              <RelatedProducts key={product.id} products={randomProducts}/>

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
  </>
  );
};


export default ProductDetailPage;



export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch(`http://localhost:5001/products`); 
  const products: DataType["products"] = await response.json();


   const allProducts: ProductType[] = [];

      Object.values(products.vintageClothes).forEach((productList: ProductType[]) => {
          productList.forEach((product: ProductType) => {
              allProducts.push(product);
          });
      });


  const paths = allProducts?.map((product: ProductType) => ({
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

  let product: ProductType | undefined = undefined;
  
  const resBoxItems = await fetch('http://localhost:5001/boxComponents'); 
  const boxItemsData = await resBoxItems.json();
  
  const response = await fetch('http://localhost:5001/products'); 
  const products: DataType["products"] = await response.json();

  const allProducts: ProductType[] = [];

      Object.values(products.vintageClothes).forEach((productList: ProductType[]) => {
          productList.forEach((product: ProductType) => {
              allProducts.push(product);
          });
      });

  
 
const getRandomProducts = (products: ProductType[], quantity: number): ProductType[] => {
   const randomProducts: ProductType[] = [];

   for (let i = 0; i < quantity; i++) {
     const randomIndex = Math.floor(Math.random() * products.length);
     randomProducts.push(products[randomIndex]);

     // Za da nema duplikati
     products.splice(randomIndex, 1);
   }
   return randomProducts;
}

const randomProducts: ProductType[] = getRandomProducts(allProducts, 6);



  if (params?.id) {
    const resProduct = await fetch(`http://localhost:5001/products/${params.id}`);
    product = await resProduct.json();
  }


return {
    props: {
      product,
      allProducts,
      randomProducts,
      boxItemsData
    },
  };
};
