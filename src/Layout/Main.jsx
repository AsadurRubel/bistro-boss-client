import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";


const Main = () => {
    const location = useLocation()
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')

    return (
        <div className="container mx-auto">
            {noHeaderFooter || <Navbar></Navbar>}
            <div className="min-h-[calc(100vh-300px)]">
            <Outlet></Outlet>
            </div>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;