import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
    return (
        <div className="space-y-4 min-h-screen flex flex-col justify-center items-center text-center">
            <title>Payment Cancelled</title>
            <FaTimesCircle size={100} className="text-red-600" />
            <h2 className="text-4xl font-bold">Payment Cancelled</h2>
            <p>Payment is cancelled. Please try again.</p>
        </div>
    );
};

export default PaymentCancelled;