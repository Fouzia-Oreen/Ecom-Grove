import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayOrderMutation,
} from "../../redux/api/orderSlice";
import moment from "moment";

const Order = () => {
  const { id: orderId } = useParams(); 
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col lg:flex-row gap-8 ">
      <div className="flex-1 overflow-x-auto">
        <div className=" my-5 ">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="">
              <table className=" w-full border-collapse">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
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

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className=" flex flex-col lg:w-[30rem]">
        <div className="mt-5 border-color_3 border p-4 m-4 flex-1">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="">Order :</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="">Name :</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="">Email :</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="">Address :</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className="mb-4">
            <strong className="">Phone :</strong>{" "}
            {order.shippingAddress.phone}
          </p>
          <p className="mb-4">
            <strong className="">Method :</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Paid on {new Date(order.paidAt).toDateString()}</Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>
        <div className="flex-1">
        <div className="p-4 mt-[3rem] flex flex-col ">
        <h2 className="text-xl font-bold mb-2 ">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>$ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>$ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>$ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>$ {order.totalPrice}</span>
        </div>
        </div>
        <div className="p-4">
        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
        </div>
        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-color_6 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;