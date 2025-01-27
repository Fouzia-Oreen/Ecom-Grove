import moment from "moment";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { useAllProductsQuery } from "../../redux/api/productSlice";
import SidebarMenu from "./SidebarMenu";
import { useFetchAllHeadersQuery } from "../../redux/api/headerSlice";

const AllHeaders = () => {
  const { data: headers, isLoading, isError } = useFetchAllHeadersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
    <div className="flex  lg:justify-center">
      <SidebarMenu />
      <div className=" md:px-12 lg:w-[1400px] p-2">
      <div className=" grid grid-cols-2 items-center justify-between ">
      <div className="ml-6">
      <Title text1={"All"} text2={"Headers"}/>
      </div>
      <p className=" text-sm font-medium text-end text-color_6">Total Headers : ({headers.length})</p>
      </div>

      {/* Your admin dashboard content goes here */}
      <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
      {headers.map((header) => (
        <Link
          key={header._id}
          to={`/admin/product/update/${header._id}`}
          className="  p-1 border-b border-color_4/40"
        >
        <div className=" md:flex-row flex gap-4 flex-col md:gap-6 justify-between">
        <div className="flex flex-col md:flex-col gap-4 ">
        {/* image */}
        <div className=" ">
        <img
          src={header.image}
          alt={header.name}
          className="h-40 w-60 object-cover p-[2px] border-color_4/30 border-opacity-70 mt-1  border rounded"
        />
        </div>
        {/* name & desc... */}
        <div className="flex flex-col gap-2 text-lg">
        <h5 className=" font-semibold">
              {header?.title}
        </h5>
        <p className="text-neutral-500 text-sm">
              {header?.description}
        </p>       
        </div>
        </div>
        <div className="flex flex-col lg:items-center justify-center gap-2">
          <div>
          <p className="text-neutral-500 text-xs">
                {moment(header.createdAt).format("MMMM Do YYYY")}
          </p>
          </div>
        <Link
              to={`/admin/header/update/${header._id}`}
              className="text-sm px-4 py-1 bg-color_3 w-fit rounded-full  font-medium hover:bg-color_4 hover:text-color_1 transition-colors duration-300 mt-3"
            >
              Update 
        </Link>
        </div>
        </div>      
        </Link>
      ))}
      </div>
    </div>
    </div>
    </div>
   
    </>
  );
};

export default AllHeaders;



