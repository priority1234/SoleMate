import { useContext } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { getAllProduct, setLoading , getAllProductFunction} = context;

     // navigate 
     const navigate = useNavigate();

     // Delete product 
     const deleteProduct = async (id) => {
         setLoading(true)
         try {
             await deleteDoc(doc(fireDB, 'products', id))
             toast.success('Product Deleted successfully')
             getAllProductFunction();
             setLoading(false)
         } catch (error) {
             console.log(error)
             setLoading(false)
         }
     }
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-indigo-300 font-bold">All Product</h1>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-indigo-100 text-indigo-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>

                        {getAllProduct.length > 0 ?
                            <>
                              {getAllProduct.map((item,index)=> {
                                return (
                                    <tr key={index} className="text-indigo-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 ">
                                        {index + 1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center p-2">
                                        <img className="w-20 rounded-lg" src={item.productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹ {item.price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.selectCategory}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.date}
                                    </td>
                                    <td onClick={()=> navigate(`/updateproduct/${item.id}`)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                        Edit
                                    </td>
                                    <td onClick={()=> deleteProduct(item.id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                        Delete
                                    </td>
                                </tr>
                                )
                              })}
                            </>
                            :
                            <h1>Not Found</h1>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;