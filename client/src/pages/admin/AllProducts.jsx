import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productSlice";
import SidebarMenu from "./SidebarMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container flex">
        
        {/* menu */}
        <div className="md:w-1/4 p-3 mt-2">
            <SidebarMenu />
        </div>
         
          <div className="m-3">
            <h1 className="text-xl mb-6 font-medium">All Products ({products.length})</h1> 
            <div className="flex flex-wrap  items-center">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className=" mb-6 overflow-hidden w-full border-b-[1px] border-color_2 p-1"
                >
                  <div className="flex  flex-col md:flex-row  justify-between md:gap-20">
                    <div className="">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-24 md:size-40 object-cover border-[1px] border-color_2 border-opacity-70 rounded-md"
                    />
                    </div>
                    <div className="flex  flex-1 justify-between">
                    <div className="flex flex-col justify-between py-2">
                    <div>
                    <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                    </h5>
                    <p className="text-color_3 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                    </div>
                    <Link
                          to={`/admin/product/update/${product._id}`}
                          className="px-4 py-1 bg-color_3 w-fit rounded-full mt-4 font-medium hover:bg-color_4 hover:text-color_1 transition-colors duration-300"
                        >
                          Update Product
                    </Link>
                    </div>

                    <div className="flex flex-col justify-between py-6 text-end">
                    <p className="text-color_3 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p> 
                    <p className="font-medium text-xl">$ {product?.price}</p>
                    </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        
      </div>
    </>
  );
};

export default AllProducts;