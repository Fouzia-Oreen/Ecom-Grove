import moment from "moment";
import { useState } from "react";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
import ProductReviews from "./ProductReviews";
import Ratings from "./Ratings";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  
   const { data: brand } = useFetchBrandsQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <section className="container flex flex-col gap-6">
      <div>
        <Link
          to="/shop"
          className="font-semibold hover:underline p-2"
        >
          Back To Shop
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
        {/* product-details */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center mt-[2rem] lg:gap-20">
          <div className="relative m-4 flex-1">
            <div className="absolute lg:right-40 top-4 right-2">
            <HeartIcon product={product} />
            </div>
            <img
              src={product.image}
              alt={product.name}
              style={{ height: "400px", objectFit: "cover" }}
              className="hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="flex flex-col justify-between m-4 flex-1">
            <h2 className="text-xl lg:text-2xl font-semibold flex-wrap xl:w-[35rem] lg:w-[35rem] md:w-[20rem] ">{product.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[20rem] text-color_4/70">
              {product.description}.
            </p>
            <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            <div className="flex items-center gap-4 my-4">
            <p className="text-2xl font-bold text-color_6">$ {product.price}</p>
            <p className=" font-medium  line-through text-color_4/60">$ {product.oldPrice}</p>
            </div>
            <div className="flex my-4 ">
              <div className="lg:w-[20rem] w-[13rem] ">
                {
                  brand ? 
                <h1 className="flex items-center mb-6 text-color_4 ">
                  <FaStore className="mr-2 text-color_4/60" /> Brand :
                  <span className="ml-1 font-semibold text-color_6 text-lg">{brand?.find((b) => b._id === product.brand)?.name}</span>
                </h1> : ""
                }
                <h1 className="flex items-center mb-6 text-color_4">
                  <FaClock className="mr-2 text-color_4/60" /> Added :     
                  <span className="font-semibold  ml-1">{moment(product.createdAt).fromNow()}</span>
                </h1>
                <h1 className="flex items-center text-color_4">
                  <FaStar className="mr-2 text-color_4/60" /> Reviews : 
                  <span className="font-semibold  ml-1">{product.numReviews}</span>
                </h1>
              </div>

              <div className="w-[10rem]">
                <h1 className="flex items-center mb-6 text-color_4 ">
                  <FaStar className="mr-2 text-color_4/60" /> Ratings :
                  <span className="font-semibold  ml-1">{product.rating}</span>
                </h1>
                <h1 className="flex items-center mb-6 text-color_4 ">
                  <FaShoppingCart className="mr-2 text-color_4/60" /> Quantity :                
                  <span className="font-semibold  ml-1">{product.quantity}</span>
                </h1>
                <h1 className="flex items-center text-color_4  ">
                  <FaBox className="mr-2 text-color_4/60" /> In Stock :
                  <span className="font-semibold  ml-1">{product.countInStock}</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center mt-4  gap-6">
            <div className="">
              {product.countInStock > 0 && (
                <div>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-1 w-[4rem] rounded-md text-color_5 font-semibold focus:outline-none border-[1px] border-color_4/50"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1} className="bg-color_1">
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="btn ctg_btn "
            >
              Add To Cart
            </button>
            </div>
          </div>
        </div>
        {/* rate the product */}
        <div className="mt-20 lg:mt-40 ">
          <ProductReviews
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
        {/* related products */}
        <div>
        <RelatedProducts />
        </div>
          

        </>
      )}
    </section>
  );
};

export default ProductDetails;