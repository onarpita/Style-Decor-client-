import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get('session_id');
    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success`, {
                sessionId,
            });
        }
    }, [sessionId, axiosSecure]);
    return (
        <div className="space-y-4 min-h-screen flex flex-col justify-center items-center text-center">
            <title>Payment Successful</title>
            <FaCheckCircle size={100} className="text-green-600" />
            <h2 className="text-4xl font-bold">Payment Successful</h2>
            <p>Thank you for your purchase. Your order is being processed.</p>
        </div>
    );
};

export default PaymentSuccess;