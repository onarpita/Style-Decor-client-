import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userPayments = [], isLoading, refetch } = useQuery({
        queryKey: ['userPayments', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/user-payments`);
            return result.data;
        }
    });
    return (
        <div className="space-y-4">
            <title>Payment History</title>
            <h2 className="text-4xl font-bold">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Service Name</th>
                            <th>Cost</th>
                            <th>Email</th>
                            <th>Transaction ID</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPayments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>{payment.service_name}</td>
                            <td>Tk. {payment.amount}</td>
                            <td>{payment.customer}</td>
                            <td>{payment.transactionId}</td>
                            <td>{new Date(payment.paid_at).toLocaleString()}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;