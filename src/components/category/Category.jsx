import { useNavigate } from "react-router";

// category 
const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11796/11796089.png',
        name: 'sandals'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/9940/9940720.png',
        name: 'boots'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/6667/6667321.png',
        name: 'heels'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/6404/6404645.png',
        name: 'loafers'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/6381/6381482.png',
        name: 'sneakers'
    }
]

const Category = () => {
        // naviaget 
        const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-3 lg:py-2 mb-2 lg:mb-0">
                {/* main 1 */}
                <div className="flex overflow-x-scroll xl:justify-center lg:justify-center md:justify-center sm:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div onClick={() => navigate(`/category/${item.name}`)} className=" w-14 h-14 lg:w-[5.2em] lg:h-[5.2em] max-w-xs rounded-full bg-indigo-600 transition-all hover:bg-indigo-500 cursor-pointer mb-1 hover:shadow-lg hover:shadow-indigo-500 " >
                                        <div className="flex justify-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className={`text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase fontPara  text-indigo-500`}>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;