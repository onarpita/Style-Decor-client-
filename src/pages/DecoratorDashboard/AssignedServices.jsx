import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AssignedServices = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: services = [], refetch} = useQuery({
        queryKey: ['services', user.email],
        queryFn: async() => {
            const res = await axiosSecure(`/services/decorators?decoratorEmail=${user.email}`);
            return res.data;
        }
    });

    const handleUpdateStatus = (id, status) => {
        const updatedStatus = {
            service_status: status,
        };
        axiosSecure.patch(`/services/decorators/${id}`, updatedStatus)
            .then(res => {
                if(res.data.modifiedCount){
                    refetch();
                    toast.success(`Service status updated to ${status}`);
                }
            });
    }
    return (
        <div className="space-y-4">
            <title>Assigned Services</title>
            <h2 className="text-4xl font-bold">Assigned Services</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Service Name</th>
                            <th>Cost</th>
                            <th>Unit</th>
                            <th>Booking Date</th>
                            <th>Service Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => <tr key={service._id}>
                            <th>{index + 1}</th>
                            <td>{service.name}</td>
                            <td>{service.email}</td>
                            <td>{service.location}</td>
                            <td>{service.service_name}</td>
                            <td>{service.cost}</td>
                            <td>{service.unit}</td>
                            <td>{new Date(service.booking_date).toLocaleDateString()}</td>
                            <td>{service.service_status}</td>
                            <td>
                                {/* assigned -> planning phase */}
                                {service.service_status === "assigned" && <button onClick={() => handleUpdateStatus(service._id, "planning phase")} className="btn btn-primary text-black">Planning Phase</button>}
                                {/* planning phase -> materials prepared */}
                                {service.service_status === "planning phase" && <button onClick={() => handleUpdateStatus(service._id, "materials prepared")} className="btn btn-primary text-black">Materials Prepared</button>}
                                {/* materials prepared -> on the way to venue */}
                                {service.service_status === "materials prepared" && <button onClick={() => handleUpdateStatus(service._id, "on the way to venue")} className="btn btn-primary text-black">On the Way to Venue</button>}
                                {/* on the way to venue -> setup in progress */}
                                {service.service_status === "on the way to venue" && <button onClick={() => handleUpdateStatus(service._id, "setup in progress")} className="btn btn-primary text-black">Setup in Progress</button>}
                                {/* setup in progress -> completed */}
                                {service.service_status === "setup in progress" && <button onClick={() => handleUpdateStatus(service._id, "completed")} className="btn btn-primary text-black">Completed</button>}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedServices;