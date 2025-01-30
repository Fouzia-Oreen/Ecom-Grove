import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import { useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from "../../redux/api/orderSlice";
import { useAllProductsQuery } from "../../redux/api/productSlice";
import { useGetUsersQuery } from "../../redux/api/userSlice";
import SidebarMenu from "./SidebarMenu";


const AdminDashboard = () => {
  const {data : sales, isLoading}= useGetTotalSalesQuery()
  const {data : salesDetail}= useGetTotalSalesByDateQuery()
  const {data: customers} = useGetUsersQuery()
  const {data: totalOrder } = useGetTotalOrdersQuery()
  const { data: products} = useAllProductsQuery();
  const { data: categories} = useFetchCategoriesQuery();
  const {data: brands} = useFetchBrandsQuery();


  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      colors: ["#D7263d"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      tooltip: {
        theme: "dark",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#C0BFC2",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
        color : "#C0BFC2"
      },
      yaxis: {
        title: {
          text: "Sales",

        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -10,
        offsetX: -8,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);


  return (
    <div className="flex lg:justify-center ">
      <SidebarMenu />
      <div className="md:px-12 lg:w-[1400px] overflow-hidden">
      <Title text1={"Admin"} text2={"Dashboard"}/>
      <section className=" p-2 ">
      {/* sales tabs */}
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 ">
        <div className="rounded-lg p-4  mt-5 bg-color_2 lg:h-[7rem] ">
          <p className=" text-color_6 font-medium lg:text-lg">Sales Of The Month</p>
          <h1 className="text-xl font-bold lg:text-2xl">
            $ {isLoading ? <Loader /> : sales.totalSales.toFixed()}
          </h1>
        </div>
        <div className="rounded-lg p-4 mt-5 bg-color_2 lg:h-[7rem]">
          <p className=" text-color_6 font-medium lg:text-lg">No Of Customer</p>
          <h1 className="text-xl font-bold lg:text-2xl">
             {isLoading ? <Loader /> : customers?.length}
          </h1>
        </div>
        <div className="rounded-lg p-5  mt-5 bg-color_2 lg:h-[7rem]">
          <p className=" text-color_6 font-medium lg:text-lg">No Of Orders</p>
          <h1 className="text-xl font-bold lg:text-2xl">
             {isLoading ? <Loader /> : totalOrder?.totalOrders}
          </h1>
        </div>
        <div className="rounded-lg p-5  mt-5 bg-color_2 lg:h-[7rem]">
          <p className=" text-color_6 font-medium lg:text-lg">Total Products</p>
          <h1 className="text-xl font-bold lg:text-2xl">
             {isLoading ? <Loader /> : products?.length}
          </h1>
        </div>
        <div className="rounded-lg p-5  mt-5 bg-color_2 lg:h-[7rem]">
          <p className=" text-color_6 font-medium lg:text-lg">Total Categories</p>
          <h1 className="text-xl font-bold lg:text-2xl">
             {isLoading ? <Loader /> : categories?.length}
          </h1>
        </div>
        <div className="rounded-lg p-5  mt-5 bg-color_2 lg:h-[7rem]">
          <p className=" text-color_6 font-medium lg:text-lg">Total Brands</p>
          <h1 className="text-xl font-bold lg:text-2xl">
              {isLoading ? <Loader /> : brands?.length}
          </h1>
        </div>
      </div>
        {/* chart */}
        <div className=" my-[4rem] lg:w-[80%] border border-color_3 p-2 rounded-md bg-color_1">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
          />
        </div>
      </section>
      </div>
    </div>
  )
}

export default AdminDashboard
