import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Loader from "../../components/loader/Loader";
import Filter from "../../components/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  // console.log(getAllProduct)

  const [filterByCategory, setFilterByCategory] = useState("");
  const [filterByHeelHeight, setFilterByHeelHeight] = useState("");
  const [filterByInSole, setFilterByInSole] = useState("");
  const [filterByClosure, setFilterByClosure] = useState("");
  const [filterByGender, setFilterByGender] = useState("");
  const [filterByMaterial, setFilterByMaterial] = useState("");
  const [filterByToeStyle, setFilterByToeStyle] = useState("");

  const filterData = getAllProduct
    .filter((obj) =>
      obj.selectCategory.toLowerCase().includes(filterByCategory)
    )
    .filter((obj) =>
      obj.selecteHeelHeight.toLowerCase().includes(filterByHeelHeight)
    )
    .filter((obj) => obj.selectInsole.toLowerCase().includes(filterByInSole))
    .filter((obj) => obj.selectClosure.toLowerCase().includes(filterByClosure))
    .filter((obj) => obj.selectGender.toLowerCase().includes(filterByGender))
    .filter((obj) =>
      obj.selectMaterial.toLowerCase().includes(filterByMaterial)
    )
    .filter((obj) =>
      obj.selectToeStyle.toLowerCase().includes(filterByToeStyle)
    );

  // console.log(filterData)

  const cartItems = useSelector((state) => state.cart);

  // console.log(cartItems);

  const dispatch = useDispatch();

  // add to cart function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // delete from cart function
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-8">
        <div className="p-5 lg:p-0">
          <div className="container mx-auto px-5 bg-indigo-50 py-10 rounded-lg border border-indigo-100 drop-shadow-md mb-5">
            <Filter
              filterByCategory={filterByCategory}
              setFilterByCategory={setFilterByCategory}
              filterByHeelHeight={filterByHeelHeight}
              setFilterByHeelHeight={setFilterByHeelHeight}
              filterByInSole={filterByInSole}
              setFilterByInSole={setFilterByInSole}
              filterByClosure={filterByClosure}
              setFilterByClosure={setFilterByClosure}
              filterByGender={filterByGender}
              setFilterByGender={setFilterByGender}
              filterByMaterial={filterByMaterial}
              setFilterByMaterial={setFilterByMaterial}
              filterByToeStyle={filterByToeStyle}
              setFilterByToeStyle={setFilterByToeStyle}
            />
          </div>
        </div>

        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="px-4 py-5 mx-auto">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-wrap justify-center -m-4">
                {filterData.length > 0 ? (
                  <>
                    {filterData.map((item, index) => {
                      const { id, productImageUrl, title, price } = item;
                      return (
                        <div key={index} className="p-4 w-full md:w-1/4">
                          <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="lg:h-80  h-96 w-full"
                              src={productImageUrl}
                              alt="image"
                            />
                            <div className="p-6">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                SoleMate
                              </h2>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                {title.substring(0, 25)}
                              </h1>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                ₹ {price}
                              </h1>

                              <div className="flex justify-center ">
                                {cartItems.some((p) => p.id === item.id) ? (
                                  <Button
                                    onClick={() => deleteCart(item)}
                                    className=" bg-red-500 hover:bg-red-600 w-full text-white py-2.5 rounded-lg font-bold"
                                  >
                                    Delete From Cart
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => addCart(item)}
                                    className=" bg-indigo-500 hover:bg-indigo-600 w-full text-white py-2.5 rounded-lg font-bold"
                                  >
                                    Add To Cart
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className=" flex justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10437/10437326.png"
                      className="w-20"
                      alt=""
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
