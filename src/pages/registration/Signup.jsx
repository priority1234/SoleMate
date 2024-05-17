/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }


    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const users = res.user;
            // console.log(user);
            const q = query(collection(fireDB, "user"), where("uid", "==", users.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(fireDB, "user"), {
                    uid: users.uid,
                    name: users.displayName,
                    image: users.photoURL,
                    authProvider: "google",
                    email: users.email,
                    role: "user",
                    time: Timestamp.now(),
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )
                });
            }


            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    // console.log("user", user);
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("user", JSON.stringify(user))

                    toast.success("Signup Successfully");

                    setLoading(false);

                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (err) {
            console.log(err)
            alert(err.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="login_Form bg-indigo-50 px-8 py-6 border border-indigo-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-indigo-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                        className='bg-indigo-50 border border-indigo-200 px-2 py-2 w-96 rounded-md outline-none placeholder-indigo-200'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        className='bg-indigo-50 border border-indigo-200 px-2 py-2 w-96 rounded-md outline-none placeholder-indigo-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        className='bg-indigo-50 border border-indigo-200 px-2 py-2 w-96 rounded-md outline-none placeholder-indigo-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-2.5">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-indigo-500 hover:bg-indigo-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div className="flex items-center justify-center mb-2">
                    <button type="button"
                        onClick={signInWithGoogle}
                        className="px-4 py-2 border w-full border-gray-400  gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 flex justify-center hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                        <img
                            className="w-6 h-6"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            loading="lazy"
                            alt="google logo"
                        />
                        <span>Signup with Google</span>
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-indigo-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;