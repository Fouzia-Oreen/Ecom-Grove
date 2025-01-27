import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Title from "../../components/Title";
import { useCreateOrderMutation } from "../../redux/api/orderSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();


  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.paymentMethodCOD, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        paymentMethodCOD: cart.paymentMethodCOD,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
    <div className="p-2">
      <ProgressSteps step1 step2 step3 />
    </div>
      <div className="container mx-auto mt-8 p-2">
        <Title text1={"Order"} text2={"Summary"} />
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="border-collapse w-full">
              <thead>
                <tr className="border-b border-color_2">
                  <td className="px-1 py-2 text-sm font-semibold text-color_4">Image</td>
                  <td className="px-1 py-2 text-sm font-semibold text-color_4">Product</td>
                  <td className="px-1 py-2 text-sm font-semibold text-color_4">Quantity</td>
                  <td className="px-1 py-2 text-sm font-semibold text-color_4">Price</td>
                  <td className="px-1 py-2 text-sm font-semibold text-color_4">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2"> $ {item.price.toFixed()}</td>
                    <td className="p-2">
                      $ {(item.qty * item.price).toFixed()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 md:mt-20 p-2">
          <h2 className="text-2xl font-semibold mb-5">User Info</h2>
          <div className="flex justify-between flex-wrap items-center">
            {error && <Message variant="danger">{error.data.message}</Message>}
            <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-4 ">Shipping</h2>
              <p>
                <strong className="text-color_4">Name :</strong> {" "}{cart.shippingAddress.username}
              </p>
              <p className="md:w-[500px] w-full">
                <strong className="text-color_4">Address : </strong> 
                {cart.shippingAddress.address},{" "}{cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}{cart.shippingAddress.country}     
              </p>
              <p>
              <strong className="text-color_4">Phone :</strong> {" "}{cart.shippingAddress.phone}
              </p>
              <p>
                <strong className="text-color_4">Note :</strong> {" "}{cart.shippingAddress.note}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <strong className="text-color_4">Method:</strong> {cart.paymentMethod}
            </div>
            </div>
            <ul className="">
            <h2 className="text-lg font-semibold mb-4 mt-12">Grand Total</h2>
              <li className="mb-2 flex justify-between">Items :
                <span className="font-semibold  ml-1 text-color_4">$ {cart.itemsPrice}</span>           
              </li>
              <li className="mb-2 flex justify-between">Shipping :
                <span className="font-semibold ml-1 text-color_4">$ {cart.shippingPrice}</span>           
              </li>
              <li className="mb-2 flex justify-between">Tax :
                <span className="font-semibold  ml-1 text-color_4">$ {cart.taxPrice}</span>           
              </li>
              <li className=" flex justify-between">Total :
                <span className="font-semibold ml-1 text-color_4">$ {cart.totalPrice}</span>           
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="bg-color_6 text-color_1 py-1 px-4 rounded-full text-lg  mt-6"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;