import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function HomeLayout({ children }) {

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
    }

    return (
        <>
            <div className="min-h-[90vh]">
                <div className="drawer absolute left-0 z-50 w-fit m-5 ">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                            <IoMdMenu onClick={changeWidth} size={"32px"} />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <li className="">
                                <Link className="font-semibold text-white" to="/">Home</Link>
                                <button className=" absolute right-2 z-50" onClick={hideDrawer}>
                                    <IoIosCloseCircle size={24} />
                                </button>
                            </li>
                            <li>
                                <Link className="font-semibold text-white" to="/About">About Us</Link>
                            </li>

                            <li>
                                <Link className="font-semibold text-white" to="/UserReference">Referal ID</Link>
                            </li>

                            <li>
                                <Link to="/Contact" className="font-semibold text-white">Contact Us</Link>
                            </li>

                            {/* if the user not Loggedin then it will show Login and SignUp button  */}
                            { !isLoggedIn && (
                                    <li className="my-2 flex flex-row w-full ">
                                        <button className=" px-3 py-1 bg-blue-400 rounded-lg font-semibold mx-2">
                                            <Link to="/Login " className="text-white">Login</Link>
                                        </button>
                                        <button className="px-3 bg-orange-500 py-1 rounded-lg font-semibold">
                                            <Link to="/Register" className="text-white">SignUp</Link>
                                        </button>
                                    </li>
                                )
                            }

                            
                            {/* if the user is Loggedin then it will show Profile and LogOut button  */}
                            { isLoggedIn && (
                                <li className="my-2 flex flex-row w-full ">
                                    <button className=" px-3 py-1 bg-blue-400 rounded-lg font-semibold mx-2">
                                        <Link to="/Profile " className="text-white">ProFile</Link>
                                    </button>
                                    <button className="px-3 bg-orange-500 py-1 rounded-lg font-semibold">
                                        <Link to="/LogOut" className="text-white">LogOut</Link>
                                    </button>
                                </li>
                            )
                        }
                            
                        </ul>
                    </div>
                </div>

                {children}

            </div>

            <Footer />
        </>
    );
}

export default HomeLayout;
