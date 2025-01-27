import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import Title from "../components/Title";
import { useFetchBrandsQuery } from "../redux/api/brandSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: brand } = useFetchBrandsQuery();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container justify-around items-start flex wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col p-4 container min-h-screen">
              <Title text1={"Shopping"} text2={"Cart"}/>
              <div className="border-b-2 border-color_2 mt-4">
              {cartItems.map((item) => (
                <div key={item._id} className="grid grid-cols-1 md:grid-cols-2  mb-[1rem] pb-2 lg:gap-20 ">
                <div className="flex mb-4">
                <div className="size-[5rem]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded border border-color_4/30"
                  />
                </div>

                <div className="flex-1 ml-4">
                  <Link to={`/product/${item._id}`} className="text-color_4">
                    {item.name}
                  </Link>

                  <div className="mt-2 text-color_6 font-bold">{brand?.find((b) => b._id === item.brand)?.name}</div>

                  {/* <div className="mt-2  font-bold">
                    $ {item.price}
                  </div> */}
                </div>
                </div>
                <div className="flex justify-between">
                <div className="flex justify-center">
                  <div className=" ">
                    <select
                      className="w-[4rem] p-1 border rounded-md border-color_4/60 focus:outline-none"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
                
                <div className=" font-bold text-right pr-4">
                      $ {item.price}
                </div>
                </div>
                </div>
              ))}
              </div>
              <div className="mt-8   w-full">
                <div className="p-4 ">
                  <div className="flex justify-between">
                  <h2 className="md:text-xl font-semibold mb-2">
                    No of Products in your cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="md:text-xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed()}
                  </div>
                  </div>
                  <div className="text-end mt-4">
                  <button
                    className="  btn ctg_btn"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;