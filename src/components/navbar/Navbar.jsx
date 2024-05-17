import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";


const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const cartItems = useSelector((state) => state.cart);
    // console.log(user)

    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
            {!user && <li>
                <Link to={'/signup'}>Signup</Link>
            </li>
            }

            {/* Login  */}
            {!user && <li>
                <Link to={'/login'}>Login</Link>
            </li>
            }

            {/* User */}
            {user && <>
                {user?.role === "user" ? <li>
                    <Link to={'/user-dashboard'}>Dashboard</Link>
                </li>
                    :
                    <li>
                        <Link to={'/admin-dashboard'}>Dashboard</Link>
                    </li>}</>}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart({cartItems.length})
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className="bg-indigo-600 sticky top-0 z-50">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-5 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className=" font-bold text-white text-2xl text-center">SoleMate</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;