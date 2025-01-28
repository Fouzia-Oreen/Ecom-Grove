import SidebarMenu from './SidebarMenu';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from '../../redux/api/orderSlice';
import Title from '../../components/Title';


 const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className='flex  lg:justify-center gap-3'>
      <SidebarMenu />
    <div className=" md:px-12 lg:w-[1400px] overflow-hidden">
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    ) : (
      <div className='flex flex-col gap-6 container'>
        <Title text1={'Order'} text2={'Items'}/>
      <div className='overflow-x-auto'>
      <table className="border-collapse w-full">
              <thead className="w-full border">
                <tr className="mb-[5rem] ">
                  <th className="text-left px-2">ITEMS</th>
                  <th className="text-left px-2">ID</th>
                  <th className="text-left px-2">USER</th>
                  <th className="text-left px-2">DATA</th>
                  <th className="text-left px-2">TOTAL</th>
                  <th className="text-left px-2">PAID</th>
                  <th className="text-left px-2">DELIVERED</th>
                  <th className="text-left px-2">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className='px-2'>
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-[4rem] pt-4" />
                    </td>
                    <td className='text-sm px-2'>{order._id}</td>

                    <td className='text-sm px-2'>{order.user ? order.user.username : "N/A"}</td>

                    <td className='text-sm px-2'>
                      {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                    </td>

                    <td className='text-sm px-2'>$ {order.totalPrice}</td>

                    <td className="py-2">
                      {order.isPaid ? (
                        <p className="py-1 px-2 text-center bg-green-200 md:w-[6rem] rounded-full font-bold text-sm text-green-700">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-200 md:w-[6rem] rounded-full font-bold text-sm text-red-500">
                          Pending
                        </p>
                      )}
                    </td>

                    <td className="px-2 py-2">
                      {order.isDelivered ? (
                        <p className="py-1  px-2 text-center bg-green-200 md:w-[6rem] rounded-full font-bold text-sm text-green-700">
                          Completed
                        </p>
                      ) : (
                        <p className="py-1  px-2 text-center bg-yellow-100 md:w-[6rem] rounded-full font-bold text-sm text-yellow-700">
                          Pending
                        </p>
                      )}
                    </td>

                    <td className="px-2 py-2">
                      <Link to={`/order/${order._id}`}>
                        <button className='bg-color_3 px-3 py-1 font-bold text-sm rounded-full'>More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
      </table>
      </div>
      </div>
    )}
  </div>
  </div>
  
  )
}
export default OrderList