import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()

    const handleGooglrSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data)
                navigate('/')
            })
        })
    }

    return (
        <div>
            <div className="text-center mb-4">
                <button onClick={handleGooglrSignIn} className="btn">
                    Signin With Google
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;