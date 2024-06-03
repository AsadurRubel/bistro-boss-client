import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

//TODO: Add publishablr key
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);
const Payment = () => {
    return (
        <div>
           <SectionTitle heading="Payment" subHeading="Please pay first"></SectionTitle> 
           <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
           </div>
        </div>
    );
};

export default Payment;