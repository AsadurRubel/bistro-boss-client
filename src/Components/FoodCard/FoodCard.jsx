import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";



const FoodCard = ({ item }) => {

    const {user} = useAuth()
    const { _id, image, name, price, recipe } = item;
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()

    const handleAddToCart = () =>{
        if(user && user.email){
            //send cart item to the database
            const craftItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', craftItem)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title:`${name} added to the cart`,
                        showConfirmButton: false,
                        timer: 1500
                      }); 
                      // refetch cart to update the cart items count
                      refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Please Log in to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
              }).then((result) => {
                if (result.isConfirmed) {
                //   Send the user to the login page
                    navigate('/login', {state: {from: location}})
                }
              });
        }
    }


    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Image" /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-5 mt-5 px-2 rounded-lg">$: {price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={handleAddToCart} className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;