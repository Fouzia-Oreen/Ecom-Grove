import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useFetchBrandsQuery } from "../redux/api/brandSlice";
import { useFetchCategoriesQuery } from "../redux/api/categorySlice";
import { useFetchProductsPerPageQuery, useGetFilteredProductsQuery } from "../redux/api/productSlice";
import {
  setBrands,
  setCategories,
  setProducts,
} from "../redux/features/shop/shopSlice";
import Product from "./products/Product";


const Shop = () => {
  const [dropdowns, setDropdowns] = useState({
    categories: true,
    brands: true,
    subCategories: true,
  });
  const toggleDropdown = (name) => {
    setDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const [ page, setPage] = useState(1);
  const [ keyword ] = useState('');
  const { pageData } = useFetchProductsPerPageQuery({ page, keyword });
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= (pageData?.pages || 1)) {
      setPage(newPage);
    }
  };
  const renderPagination = () => {
    const totalPages = pageData?.pages || 1;
    const pagination = [];

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

  const dispatch = useDispatch();
  const { categories, products, checked, radio, brands } = useSelector(
    (state) => state.shop
  );

  const brandsQuery  = useFetchBrandsQuery();
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
    if (!brandsQuery.isLoading) {
      dispatch(setBrands(brandsQuery.data));
    }
  }, [categoriesQuery.data,brandsQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleCategoryClick = (categories) => {
    const productsByCategory = filteredProductsQuery.data?.filter(
      (product) => product.category === categories
    );

    dispatch(setProducts(productsByCategory));
  };

  const handleBrandClick = (brands) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brands
    );
    dispatch(setProducts(productsByBrand));
  };

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };


  return (
    <>
      <div className=" mx-auto  h-full my-12 flex lg:items-center lg:justify-center">
        <div className="flex flex-col md:flex-row mx-auto">
          {/* filters */}
          <div className=" p-3 mt-2 mb-2  md:border-r-[1px] md:border-color_3">
            {/* filter by category */}
            <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg py-2 rounded-full mb-2">
              Filter by Categories
            </h2> 
            <button
              onClick={() => toggleDropdown('categories')}
              className="flex items-center focus:outline-none "
            >  
            <IoIosArrowDown className={`h-4 w-4 ml-1 ${ !dropdowns ? "transform rotate-180" : "" }`}/>   
            </button>
            </div>
            {
              dropdowns.categories && (
                <div className="p-5 w-[15rem]">
                {categories?.map((category) => (
                  <div key={category._id} className="mb-2">
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        id="red-checkbox"
                        onChange={() => handleCategoryClick(category._id)}
                        className="focus:ring-color_6  focus:ring-[3px] rounded-full bg-color_6"
                        checked={checked && checked.includes(category._id)}
                      />
                      <label
                        htmlFor="pink-checkbox"
                        className="ml-3 "
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              )
            }
            {/* filter by brand */}
            <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg py-2 rounded-full mb-2">
              Filter by Brands
            </h2> 
            <button
              onClick={() => toggleDropdown('brands')}
              className="flex items-center focus:outline-none "
            >        
            <IoIosArrowDown className={`h-4 w-4 ml-1 ${ !dropdowns ? "transform rotate-180" : "" }`}/>      
            </button>
            </div>
            {
              dropdowns.brands && (
                <div className="p-5 w-[15rem]">
                {brands?.map((brand) => (
                  <div key={brand._id} className="mb-2">
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        id="red-checkbox"
                        onChange={() => handleBrandClick(brand._id)}
                        className="focus:ring-color_6  focus:ring-[3px] rounded-full bg-color_6"
                        checked={checked && checked.includes(brand._id)}
                      />

                      <label
                        htmlFor="pink-checkbox"
                        className="ml-3 "
                      >
                        {brand.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              )
            }
            {/* price filter */}
            <h2 className="font-semibold text-lg py-2 rounded-full mb-2">
              Filer by Price
            </h2>

            <div className="py-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                 className="w-full px-3 py-2 "

              />
            </div>

            <div className=" flex items-center justify-center">
              <button
                className="  my-4 btn ctg_btn"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3 md:py-8 md:px-12 lg:w-[1400px]">
            <h2 className="text-lg font-medium  mb-6">No of products : {products?.length}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {products?.length === 0 ? (
                <Loader />
              ) : (
                products?.slice(0, 10).map((product) => (
                  <div className="p-3 " key={product._id}>
                    <Product product={product} />
                  </div>
                )))}
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

export default Shop;