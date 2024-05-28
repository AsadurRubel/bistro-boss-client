import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useState } from "react";
import Swal from "sweetalert2";



const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext)

    const [registerError, setRegisterError] = useState('');
    console.log(registerError)
    const navigate = useNavigate()




    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        reset();
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Registration successful!',
                            timer: 2000
                        });
                        console.log(result.user)
                        Navigate(location?.state ? location.state : '/')
                    })
                    .catch(error => {
                        console.error(error)
                        setRegisterError(error.message)
                    })
                    navigate('/')

            })
            .catch(error => {
                console.error(error)
                setRegisterError(error.message)
            })
   
}



return (
    <>
        <Helmet>
            <title>Bistro Boss || Sign Up</title>
        </Helmet>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                {...register("name", { required: true })}
                                name="name"
                                placeholder="Your Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">Name field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"
                                {...register("photo", { required: true })}
                                name="photo"
                                placeholder="Your Photo URL" className="input input-bordered" />
                            {errors.photo && <span className="text-red-500">Photo field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                {...register("email", { required: true })}
                                name="email"
                                placeholder="email" className="input input-bordered" required />
                            {errors.email && <span className="text-red-500">Email field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                name="password"
                                placeholder="password" className="input input-bordered" required />
                            {errors.password?.type === 'required' && <span className="text-red-500">Password is Require</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less than 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500">Password must have one Uppercase, one Lowercase, one Number and one special character</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                    <p className='text-center mb-3'><small>Already Register? <Link to='/login'>Please Login</Link> </small></p>
                </div>
            </div>
        </div>
    </>
);
};

export default SignUp;