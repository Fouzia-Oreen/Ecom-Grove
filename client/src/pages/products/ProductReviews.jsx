import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productSlice";
// import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductReviews = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
   product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col ">
      <section className="flex w-[24rem] p-4">
        <div
          className={`flex-1 p-2 cursor-pointer text-lg  mr-2 ${
            activeTab === 1 ? "font-bold text-color_6" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-2 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold text-color_6" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        {/* <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div> */}
      </section>

      {/* Second Part */}
      <section className="p-4 ">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-lg font-medium mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-1 border border-color_4/50 rounded-md  focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-4">
                  <label htmlFor="comment" className="block text-lg font-medium mb-2">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-md md:w-[40rem] w-full"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-color_5 text-white py-2 px-4 rounded-full"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <>
            <div className=" pl-2">{product.reviews.length === 0 && <p>No Reviews</p>}</div>

            <div className="px-4">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className=" p-4 rounded-lg  md:w-[30rem] w-full mb-2 bg-color_2/60 "
                >
                  <div className="flex justify-between">
                    <strong className="">{review.name}</strong>
                    <p className="text-xs">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* <section>
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section> */}
    </div>
  );
};

export default ProductReviews;