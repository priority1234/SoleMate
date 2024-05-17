import { useContext, useEffect, useState } from "react";
import myContext from "../../../context/myContext";
import { useNavigate, useParams } from "react-router";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import Loader from "../../../components/loader/Loader";

const categoryList = [
  {
    name: "shoes",
  },
  {
    name: "sandals",
  },
  {
    name: "boots",
  },
  {
    name: "heels",
  },
  {
    name: "loafers",
  },
  {
    name: "sneakers",
  },
];

const heelHeightList = [
  {
    name: "1 inch 1 3/4 inch",
  },
  {
    name: "2 inch  2 3/ 4 inch",
  },
  {
    name: "other",
  },
];

const inSoleList = [
  {
    name: "leather",
  },
  {
    name: "synthetic",
  },
  {
    name: "other",
  },
];

const closureList = [
  {
    name: "lace up",
  },
  {
    name: "pull on",
  },
  {
    name: "zipper",
  },
  {
    name: "other",
  },
];

const genderList = [
  {
    name: "m",
  },
  {
    name: "f",
  },
];

const materialList = [
  {
    name: "leather",
  },
  {
    name: "canvas",
  },
  {
    name: "other",
  },
];

const toeStyleList = [
  {
    name: "round toe",
  },
  {
    name: "square toe",
  },
  {
    name: "snub toe",
  },
];
const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  // navigate
  const navigate = useNavigate();

  const { id } = useParams();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    selectCategory: undefined,
    selecteHeelHeight: undefined,
    selectInsole: undefined,
    selectClosure: undefined,
    selectGender: undefined,
    selectMaterial: undefined,
    selectToeStyle: undefined,
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const updateProduct = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.selectCategory == undefined ||
      product.selecteHeelHeight == undefined ||
      product.selectInsole == undefined ||
      product.selectClosure == undefined ||
      product.selectGender == undefined ||
      product.selectMaterial == undefined ||
      product.selectToeStyle == undefined ||
      product.description == ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Get Single Product Function
  const getSingleProductFunction = async () => {
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      //   console.log(product.data())
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        selectCategory: product?.selectCategory,
        selecteHeelHeight: product?.selecteHeelHeight,
        selectInsole: product?.selectInsole,
        selectClosure: product?.selectClosure,
        selectGender: product?.selectGender,
        selectMaterial: product?.selectMaterial,
        selectToeStyle: product?.selectToeStyle,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [id]);

  return (
    <div>
      <div className="flex lg:justify-center items-center lg:h-screen">
        {loading && <Loader />}
        {/* Login Form  */}
        <div className="login_Form bg-indigo-50 px-8 py-6 border border-indigo-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-indigo-500 ">
              Add Product
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-3 justify-between">
            {/* Input One  */}
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    title: e.target.value,
                  });
                }}
                placeholder="Product Title"
                className="bg-indigo-50 text-indigo-300 border border-indigo-200 px-2 py-2 w-[25.2em] lg:w-60 
                                rounded-md outline-none placeholder-indigo-300"
              />
            </div>

            {/* Input Two  */}
            <div className="mb-3">
              <input
                type="number"
                placeholder="Product Price"
                value={product.price}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    price: e.target.value,
                  });
                }}
                className="bg-indigo-50 text-indigo-300 border border-indigo-200 px-2 py-2 w-[25.2em] lg:w-60 
                                rounded-md outline-none placeholder-indigo-300"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-3 justify-between">
            {/* Input Three  */}
            <div className="mb-3">
              <input
                type="text"
                value={product.productImageUrl}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productImageUrl: e.target.value,
                  });
                }}
                placeholder="Product Image Url"
                className="bg-indigo-50 text-indigo-300 border border-indigo-200 px-2 py-2 w-[25.2em] lg:w-60  rounded-md outline-none placeholder-indigo-300"
              />
            </div>

            {/* Input Four Select Product category  */}
            <div className="mb-3">
              <select
                value={product.selectCategory}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selectCategory: e.target.value,
                  });
                }}
                className="px-1 py-2.5 text-indigo-300 bg-indigo-50 w-[25.2em] lg:w-60  border border-indigo-200 rounded-md outline-none  "
              >
                <option selected={"Select Product Category"} disabled>
                  Select Product Category
                </option>
                {categoryList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-3 justify-between">
            {/* Input Six Select heel Height  */}
            <div className="mb-3">
              <select
                value={product.selecteHeelHeight}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selecteHeelHeight: e.target.value,
                  });
                }}
                className="px-1 py-2 w-[25.2em] lg:w-60 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none  "
              >
                <option selected disabled>
                  Select Heel Height
                </option>
                {heelHeightList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Input Seven Select Insole   */}
            <div className="mb-3">
              <select
                value={product.selectInsole}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selectInsole: e.target.value,
                  });
                }}
                className="px-1 py-2 w-[25.2em] lg:w-60 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none  "
              >
                <option selected disabled>
                  Select insole
                </option>
                {inSoleList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-3 justify-between">
            {/* Input Eight Select closure   */}
            <div className="mb-3">
              <select
                value={product.selectClosure}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selectClosure: e.target.value,
                  });
                }}
                className="w-[25.2em] lg:w-60  px-1 py-2 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none  "
              >
                <option selected disabled>
                  Select closure
                </option>
                {closureList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Input Nine Select Gender   */}
            <div className="mb-3">
              <select
                value={product.selectGender}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selectGender: e.target.value,
                  });
                }}
                className="w-[25.2em] lg:w-60  px-1 py-2 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none  "
              >
                <option selected disabled>
                  Select Gender
                </option>
                {genderList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name == "m" ? "male" : "female"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-3 justify-between">
            {/* Input Ten Select Material   */}
            <div className="mb-3">
              <select
                value={product.selectMaterial}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selectMaterial: e.target.value,
                  });
                }}
                className="w-[25.2em] lg:w-60  px-1 py-2 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none  "
              >
                <option selected disabled>
                  Select Material
                </option>
                {materialList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Input Ten Select Toe Style   */}
            <div className="mb-3">
              <select
                value={product.selectToeStyle}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    selectToeStyle: e.target.value,
                  });
                }}
                className="w-[25.2em] lg:w-60  px-1 py-2 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none  "
              >
                <option selected disabled>
                  Select Toe Style
                </option>
                {toeStyleList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option className=" capitalize" key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Input Eleven  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full  px-2 py-1 text-indigo-300 bg-indigo-50 border border-indigo-200 rounded-md outline-none placeholder-indigo-300 "
            ></textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <Button
              onClick={updateProduct}
              type="button"
              className="bg-indigo-500 hover:bg-indigo-600 w-full  text-white text-center py-2.5 font-bold rounded-md "
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
