import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Button } from "@material-tailwind/react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductCard = () => {
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();

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
    <div className="mt-5 lg:mt-5">
      {/* Heading  */}
      <div className="flex justify-between items-center">
        <h1
          className={`mb-0 lg:mb-2 text-2xl font-semibold  px-2 lg:px-4 py-4 lg:py-0 
               text-[#663aa6`}
        >
          Latest Products
        </h1>

        <Link to={"/allproduct"}>
          <div className="flex items-center px-4 gap-2 mb-0 lg:mb-2 ">
            <h2
              className={` text-md font-serif py-4 lg:py-0 fontPara text-[#663aa6 fontWeight cursor-pointer`}
            >
              View All
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-move-right text-[#663aa6]`}
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </div>
        </Link>
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
              {getAllProduct.length > 0 ? (
                <>
                  {getAllProduct.slice(0, 8).map((item, index) => {
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
                              ₹{price}
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
  );
};

export default ProductCard;
