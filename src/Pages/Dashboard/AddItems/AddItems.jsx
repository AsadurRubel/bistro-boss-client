import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
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
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                //Show Success Pop Up
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:`${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('with image url', res.data)
    }

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's New"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", {required: true})} />
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name<span className="text-red-500">*</span></span>
                        </div>
                        <input
                            type="text"
                            required
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
                            <select defaultValue="default" {...register('category', {required: true})}
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
                                    required
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
                            required
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        </label>
                    </div>
                    <div className="my-5">
                        <input
                            {...register('image', {required: true})}
                            type="file" 
                            required
                            className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn">Add Item <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;