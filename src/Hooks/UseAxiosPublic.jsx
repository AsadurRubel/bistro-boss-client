import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://bistro-boss-server-chi-blue.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;