import { BsCart3 } from "react-icons/bs";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart()
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
    <div className="container mx-auto flex">
        {/* Side Bar */}
        <div className="w-64 min-h-screen bg-orange-400">
            <ul className="menu p-2">
        {
            isAdmin ? <>
                <li>
                    <NavLink to='/dashboard/adminHome'>
                        <FaHome></FaHome> Admin Home</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/addItems'>
                        <FaUtensils></FaUtensils> Add Items</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/manageItems'>
                        <FaList></FaList> Manage Items
                        ({cart.length})
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/bookings'>
                        <FaBook></FaBook> Manage Bookings </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/users'>
                        <FaUser></FaUser> All Users</NavLink>
                </li>
            </>
                :
                <>
                    <li>
                        <NavLink to='/dashboard/userHome'>
                            <FaHome></FaHome> User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reservation'>
                            <FaCalendar></FaCalendar> Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'>
                            <BsCart3></BsCart3>My Cart
                            ({cart.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/review'>
                            <FaAd></FaAd>Add a Review </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/bookings'>
                            <FaList></FaList> My Bookings</NavLink>
                    </li>
                </>
        }

        {/* Shared Nav Links */}
        <div className="divider"></div>
        <li>
            <NavLink to='/'>
                <FaHome></FaHome> Home</NavLink>
        </li>
        <li>
            <NavLink to='/order/salad'>
                <FaSearch></FaSearch> Menu</NavLink>
        </li>
        <li>
            <NavLink to='/order/contact'>
                <FaEnvelope></FaEnvelope>  Contact</NavLink>
        </li>
    </ul>

        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8">
            <Outlet></Outlet>
        </div>


    </div>
    );
};

export default Dashboard;