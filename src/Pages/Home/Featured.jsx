import SectionTitle from "../../Components/SectionTitle/SectionTitle";

import featuredImg from '../../assets/home/featured.jpg'
import './Featured.css'


const Featured = () => {

    return (
        <div className="featured-item mb-10 text-white pt-8 bg-fixed">
            <SectionTitle
                heading="featured Item"
                subHeading="Check It out"
            ></SectionTitle>
        <div className="md:flex justify-center items-center py-20 pt-12 px-36 bg-slate-500 bg-opacity-40">
            <div>
                <img src={featuredImg} alt="" />
            </div>
            <div className="md:ml-10">
                <p className="mb-2">Aug 20, 2029</p>
                <p className="uppercase">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit culpa eos voluptas iste doloribus itaque ratione vitae iure, voluptatum enim corporis dolorum ab? Eius repellat suscipit ex sapiente voluptatem commodi maiores earum quos vitae modi neque ea, architecto pariatur eum necessitatibus officiis iste molestias voluptas quidem aliquid accusamus obcaecati officia.</p>
                <button className="btn btn-outline border-0 border-b-4 mt-4 text-white">Order Now</button>
            </div>
        </div>



        </div>
    );
};

export default Featured;