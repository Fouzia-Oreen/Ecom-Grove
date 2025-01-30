import moment from "moment";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { useAllProductsQuery, useFetchProductsPerPageQuery } from "../../redux/api/productSlice";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
    const [ page, setPage] = useState(1);
    const [ keyword ] = useState('');
    const { data } = useFetchProductsPerPageQuery({ page, keyword });
  
     const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= (data?.pages || 1)) {
        setPage(newPage);
      }
    };
    const renderPagination = () => {
      const totalPages = data?.pages || 1;
      const pagination = [];
  
      // Add the "Prev" button
      pagination.push(
        <button
          key="prev"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 text-sm font-semibold"
        >
          Prev
        </button>
      );
  
      // Add page numbers
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2.5 py-1 border rounded-full bg-color_2 text-sm font-medium ${
              i === page ? 'bg-color_6 text-white' : ''
            }`}
          >
            {i}
          </button>
        );
      }
      // Add the "Next" button
      pagination.push(
        <button
          key="next"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 text-sm font-semibold"
        >
          Next
        </button>
      );
      return pagination;
    };
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
    <div className="flex lg:justify-center">
      <SidebarMenu />
      <div className=" md:px-12 lg:w-[1400px] p-2">
      <div className=" grid grid-cols-2 items-center justify-between">
      <Title text1={"All"} text2={"Products"}/>
      <p className=" text-sm font-medium text-end text-color_6">Total Products : ({products.length})</p>
      </div>

      {/* Your admin dashboard content goes here */}
      <div >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14">
      {data?.products.map((product) => (
        <Link
          key={product._id}
          to={`/admin/product/update/${product._id}`}
          className=" overflow-hidden w-full  p-1 border-b border-color_4/40"
        >
        <div className=" md:flex-row flex gap-4 flex-col md:gap-6 justify-between">
        <div className="flex gap-4 items-center">
        {/* image */}
        <div className=" border-color_2 border-opacity-70 mt-1  border rounded placeholder-color_3 border-color_4/30 ">
        <img
          src={product.image}
          alt={product.name}
          className="h-20 w-20 object-cover p-[2px]"
        />
        </div>
        {/* name & desc... */}
        <div className="flex flex-col gap-2 ">
        <h5 className=" font-semibold">
              {product?.name?.substring(0, 20)}....
        </h5>
        <p className="text-neutral-500 text-xs">
              {product?.description?.substring(0, 50)}...
        </p>       
        </div>
        </div>
        <div className="flex md:flex-col justify-between">
          <div>
          <p className="text-neutral-500 text-xs">
                {moment(product.createdAt).format("MMMM Do YYYY")}
          </p>
          <p className="font-medium ">$ {product?.price}</p>
          </div>
        <Link
              to={`/admin/product/update/${product._id}`}
              className="text-sm px-4 py-1 bg-color_3 w-fit rounded-full  font-medium hover:bg-color_4 hover:text-color_1 transition-colors duration-300 mt-3"
            >
              Update 
        </Link>
        </div>
        </div>      
        </Link>
      ))}
      </div>
      {/* pagination */}
      <div className="flex items-center justify-center mt-12 space-x-2 ">
      {renderPagination()}
      </div>
    </div>
    </div>
    </div>
   
    </>
  );
};

export default AllProducts;



