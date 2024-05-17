/* eslint-disable react/prop-types */

const categoryList = [
  {
    name: "All",
  },
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
    name: "All",
  },
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
    name: "All",
  },
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
    name: "All",
  },
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
    name: "All",
  },
  {
    name: "m",
  },
  {
    name: "f",
  },
];

const materialList = [
  {
    name: "All",
  },
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
    name: "All",
  },
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

const Filter = ({
  filterByCategory,
  setFilterByCategory,
  filterByHeelHeight,
  setFilterByHeelHeight,
  filterByInSole,
  setFilterByInSole,
  filterByClosure,
  setFilterByClosure,
  filterByGender,
  setFilterByGender,
  filterByMaterial,
  setFilterByMaterial,
  filterByToeStyle,
  setFilterByToeStyle,
}) => {
  // const context = useContext(myContext);
  // const { mode } = context;
  return (
    <>
      <div className="">
        <div className="flex lg:justify-around flex-wrap">
          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By Category</h1>

            <select
              value={filterByCategory}
              onChange={(e) => setFilterByCategory(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {categoryList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By Heel Height</h1>
            <select
              value={filterByHeelHeight}
              onChange={(e) => setFilterByHeelHeight(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {heelHeightList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex lg:justify-around flex-wrap">
          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By inSole</h1>
            <select
              value={filterByInSole}
              onChange={(e) => setFilterByInSole(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {inSoleList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By Closure</h1>
            <select
              value={filterByClosure}
              onChange={(e) => setFilterByClosure(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {closureList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex lg:justify-around flex-wrap">
          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By Gender</h1>
            <select
              value={filterByGender}
              onChange={(e) => setFilterByGender(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {genderList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name == "All"
                      ? "All"
                      : item.name == "m"
                      ? "male"
                      : "female"}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By Material</h1>
            <select
              value={filterByMaterial}
              onChange={(e) => setFilterByMaterial(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {materialList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex lg:justify-center">
          <div className="mb-3">
            <h1 className="fontPara font-semibold">Filter By ToeStyle</h1>
            <select
              value={filterByToeStyle}
              onChange={(e) => setFilterByToeStyle(e.target.value)}
              className="form-select w-80 lg:w-72 outline-none py-2 px-2 rounded-md mt-2 bg-indigo-100"
            >
              {toeStyleList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.name === "All" ? "" : item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
