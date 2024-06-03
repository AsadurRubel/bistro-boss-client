import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data)
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        });
    }



    return (
    <div>
        <SectionTitle heading="Manage all Items" subHeading="Hurry Up"></SectionTitle>
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>price</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                menu.map((item, index) => <tr key={item._id}>
                    <th>
                        {index + 1}
                    </th>
                    <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.image} alt="Image" />
                                </div>
                            </div>

                        </div>
                    </td>
                    <td>
                        {item.name}

                    </td>
                    <td>${item.price}</td>
                    <th>
                        <Link to={`/dashboard/updateItem/${item._id}`}>
                        <button className="btn btn-ghost "><FaRegEdit className="text-2xl" /></button>
                        </Link>
                    </th>
                    <td> <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn btn-ghost"><MdDeleteForever className="text-3xl text-red-500" /></button> </td>
                </tr>)
            }

            </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default ManageItems;