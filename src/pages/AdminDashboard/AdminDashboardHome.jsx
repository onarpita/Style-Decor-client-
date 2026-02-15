import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const {data: bookingStats = []} = useQuery({
        queryKey: ['bookingStats'],
        queryFn: async() => {
            const res = await axiosSecure("/services/booked");
            return res.data;
        }
    });

    const getBarChartData = data => {
        return data.map(item => {
            return {name: item.service_name, value: item.count}
        });
    }
    return (
        <div className="space-y-4 overflow-x-hidden">
            <title>Admin Dashboard</title>
            <h2 className="text-4xl font-bold">Admin Dashboard</h2>
            <h3 className="text-3xl font-semibold">Service Demand Chart</h3>
            <BarChart
                style={{ width: '100%', maxWidth: '1000px', maxHeight: '50vh', aspectRatio: 1.6 }}
                responsive
                data={getBarChartData(bookingStats)}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#E17D02" />
            </BarChart>
        </div>
    );
};

export default AdminDashboardHome;