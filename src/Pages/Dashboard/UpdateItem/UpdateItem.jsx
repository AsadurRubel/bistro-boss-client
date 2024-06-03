
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { register, handleSubmit } = useForm()
    const {name, category, price, recipe, _id} = useLoaderData();

    // console.log("item",item)
    
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async(data) => {
        //Image upload to imgbb and then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                //Show Success Pop Up
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:`${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('with image url', res.data)
    }



    return (
        <div>
            <SectionTitle heading="Update Item" subHeading="Refresh Info"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", {required: true})} />
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name<span className="text-red-500">*</span></span>
                        </div>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe Name"
                            {...register("name", {required: true})}
                            className="input 
                            input-bordered w-full " />
                    </label>
                    <div className="flex items-center gap-5">
                        <div className="w-full">
                            <div className="label">
                                <span className="label-text">Category Name<span className="text-red-500">*</span></span>
                            </div>
                            <select defaultValue={category} {...register('category', {required: true})}
                                required
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>

                            </select>
                        </div>
                        <div className="w-full">
                            <label className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Price<span className="text-red-500">*</span></span>
                                </div>
                                <input
                                    type="number"
                                    defaultValue={price}
                                    placeholder="Price"
                                    {...register("price", {required: true})}
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Recipe Details</span>
                            </div>
                            <textarea {...register('recipe', {required: true})} 
                            defaultValue={recipe}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        </label>
                    </div>
                    <div className="my-5">
                        <input
                            {...register('image', {required: true})}
                            type="file" 
                            className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn">Update Menu Item <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;