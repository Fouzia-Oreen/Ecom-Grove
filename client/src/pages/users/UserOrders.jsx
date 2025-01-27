import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Title from "../../components/Title";
import { useGetMyOrdersQuery } from "../../redux/api/orderSlice";


const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="lg:container mx-auto overflow-x-auto p-2 min-h-screen">
    <Title text1={"My"} text2={"Orders"} />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="border-collapse w-full ">
          <thead>
            <tr className="border-b border-color_3 ">
              <td className=" pl-6 py-2 font-bold text-color_4">IMAGE</td>
              <td className=" pl-16 py-2 font-bold text-color_4">ID</td>
              <td className=" pl-6 py-2 font-bold text-color_4">DATE</td>
              <td className=" pl-4 py-2 font-bold text-color_4">TOTAL</td>
              <td className=" text-center py-2 font-bold text-color_4">PAID</td>
              <td className=" text-center py-2 font-bold text-color_4">DELIVERED</td>
              <td className=" pl-4 py-2 font-bold text-color_4">ACTIONS</td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} >
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[4rem] mb-5 mx-2"
                />

                <td className="py-2 px-2">{order._id}</td>
                <td className="py-2 px-2 text-sm">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2 px-2 ">$ {order.totalPrice}</td>

                <td className="py-2 px-2 ">
                  {order.isPaid ? (
                    <p className="py-1 font-medium text-sm text-green-600 bg-green-200 px-3 rounded-full w-[6rem] mx-auto">
                      Completed
                    </p>
                  ) : (
                    <p className="py-1 font-medium text-sm text-color_6 bg-red-200 px-3 rounded-full w-[6rem] mx-auto text-center">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="py-1 font-medium text-sm text-green-600 bg-green-200 px-3 rounded-full w-[6rem] mx-auto text-center">
                      Completed
                    </p>
                  ) : (
                    <p className="py-1 font-medium text-sm text-color_4 bg-color_2 px-3 rounded-full text-center w-[6rem] mx-auto ">
                      Pending
                    </p>
                  )}
                </td>

                <td className="py-2 px-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-color_4 w-[100px] py-1 rounded-full text-color_1 text-sm font-medium ">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;