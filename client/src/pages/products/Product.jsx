/* eslint-disable react/prop-types */

import { BsBagCheck } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";
import { useGetNewProductsQuery } from "../../redux/api/productSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
//

const Product = ({product}) => {
  const dispatch = useDispatch();
   const { data: brand } = useFetchBrandsQuery();
   const brandName = brand?.find(b => b._id === product.brand)?.name;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  return (
      <>
      {/* this is a product card */}
      <Link to={`/product/${product._id}`} className="flex items-center justify-center shadow-sm w-[280px] h-[280px] bg-color_2/30 shadow-black/20">
        <div className="flex flex-col gap-4 ">   
        <div className=" justify-end items-start flex ">
        <div className=" relative flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          style={{ height: "170px", objectFit: "cover" }}
          className="hover:scale-105 transition-transform duration-500"
        />
        </div>
        {
           brand ? 
           <div className="absolute  bg-color_6 px-3 py-0.5 mt-2 rounded-full text-color_1 font-semibold">{brandName}</div> : ""
        }
        <div className="flex items-end flex-col gap-3 ml-6 mt-20">
        <HeartIcon  product={product} />       
        <BsBagCheck className="size-5 text-color_5" onClick={() => addToCartHandler(product, 1)}/>
        </div>
        </div> 
        <div className="flex flex-col justify-center items-center gap-2 p-2 ">
          <h2 className=" font-medium md:text-lg">
          {product?.name?.substring(0, 30)}
          </h2>
          <div className="flex gap-3 items-baseline justify-end">
          <p className=" font-semibold text-color_6">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-sm line-through text-gray-500 font-medium">
            {product?.oldPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          </div>
        </div>
        </div>
      </Link>     
      </>   
  );
};

export default Product;

