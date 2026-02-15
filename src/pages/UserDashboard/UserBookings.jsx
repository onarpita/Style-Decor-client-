import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserBookings = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const updateModalRef = useRef();
    const { data: userBookings = [], isLoading, refetch } = useQuery({
        queryKey: ['userBookings', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/user-bookings`);
            return result.data;
        }
    });

    const handlePayment = async(booking) => {
        const paymentInfo = {
            bookingId: booking._id,
            cost: Number(booking.cost),
            service_name: booking.service_name,
            customer_name: booking.name,
            customer_email: booking.email,
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.assign(res.data.url);
    }

    const openUpdateBooking = booking => {
        setSelectedBooking(booking);
        updateModalRef.current.showModal();
    }

    const handleUpdateBooking = e => {
        e.preventDefault();
        const bookingDate = e.target.booking_date.value;
        const updatedBooking = {
            booking_date: bookingDate
        };
        axiosSecure.patch(`/booking/${selectedBooking._id}`, updatedBooking)
            .then(res => {
                if(res.data.modifiedCount){
                    updateModalRef.current.close();
                    refetch();
                    toast.success("Booking updated successfully");
                }
            });
    }

    const handleCancelBooking = id => {
        Swal.fire({
            title: "Are you sure to Cancel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/booking/${id}`)
                    .then(res => {
                        if(res.data.deletedCount){
                            refetch();
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Booking has been cancelled.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }
    return (
        <div className="space-y-4">
            <title>My Bookings</title>
            <h2 className="text-4xl font-bold">My Bookings</h2>
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
                            <th>Booking Date</th>
                            <th>Payment Status</th>
                            <th>Service Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userBookings.map((booking, index) => <tr key={booking._id}>
                            <th>{index + 1}</th>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.location}</td>
                            <td>{booking.service_name}</td>
                            <td>{booking.cost}</td>
                            <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                            <td>{booking.payment_status}</td>
                            <td>{booking.service_status}</td>
                            <td>
                                <div className="flex gap-2">
                                    {booking.payment_status !== "paid" && <button onClick={() => handlePayment(booking)} className="btn btn-primary text-black">Pay</button>}
                                    <button onClick={() => openUpdateBooking(booking)} className="btn btn-secondary text-white">Update</button>
                                    <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-primary text-black">Cancel</button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <dialog ref={updateModalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    {/* content */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold">Update Booking</h2>
                        <form onSubmit={handleUpdateBooking} className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Booking Date</label>
                                <input type="date" name="booking_date" defaultValue={selectedBooking?.booking_date} className="input w-full" />
                            </div>
                            <div className="col-span-full">
                                <button className="btn btn-primary text-black">Update</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UserBookings;