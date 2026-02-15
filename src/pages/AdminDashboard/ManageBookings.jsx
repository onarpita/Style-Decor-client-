import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("booking_date");
    const [order, setOrder] = useState("desc");
    const decoratorModalRef = useRef();
    const limit = 10;
    const { data: bookings = [], isLoading: isBookingLoading, refetch: bookingRefetch } = useQuery({
        queryKey: ['bookings', currentPage, sort, order],
        queryFn: async () => {
            const result = await axiosSecure(`/bookings?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&service_status=pending`);
            const page = Math.ceil(result.data.total / limit);
            setTotalPage(page);
            return result.data.result;
        }
    });
    const {data: decorators = [], isLoading: isDecoratorLoading, refetch: decoratorRefetch} = useQuery({
        queryKey: ['decorators', 'available'],
        queryFn: async() => {
            const result = await axiosSecure(`/users?role=decorator&work_status=available`);
            return result.data.result;
        }
    });
    const handleSort = e => {
        const sortText = e.target.value;
        setSort(sortText.split("-")[0]);
        setOrder(sortText.split("-")[1]);
    }
    const openDecoratorRefModal = booking => {
        setSelectedBooking(booking);
        decoratorModalRef.current.showModal();
    }
    const handleAssignDecorator = decorator => {
        const decoratorAssignInfo = {
            decoratorId: decorator._id,
            decoratorName: decorator.displayName,
            decoratorEmail: decorator.email,
            bookingId: selectedBooking._id,
        };
        console.log(decoratorAssignInfo)
        axiosSecure.patch(`/booking/${selectedBooking._id}/assigned`, decoratorAssignInfo)
            .then(res => {
                if(res.data.modifiedCount){
                    decoratorModalRef.current.close();
                    bookingRefetch();
                    decoratorRefetch();
                    toast.success("Decorator has been assigned");
                }
            });
    }
    return (
        <div className="space-y-4">
            <title>Manage Bookings</title>
            <div className="flex gap-2 flex-wrap justify-between">
                <h2 className="text-4xl font-bold">Manage Bookings</h2>
                <select onChange={handleSort} className="select">
                    <option value="" selected disabled>Sort By</option>
                    <option value="booking_date-asc">Booking Date - Ascending</option>
                    <option value="booking_date-desc">Booking Date - Descending</option>
                    <option value="payment_status-asc">Payment Status - Ascending</option>
                    <option value="payment_status-desc">Payment Status - Descending</option>
                </select>
            </div>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => <tr key={booking._id}>
                            <th>{index + (currentPage * limit) + 1}</th>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.location}</td>
                            <td>{booking.service_name}</td>
                            <td>Tk. {booking.cost}</td>
                            <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                            <td>{booking.payment_status}</td>
                            <td>{booking.payment_status === "paid" && <button onClick={() => openDecoratorRefModal(booking)} className="btn btn-primary text-black">Find Decorators</button>}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center flex-wrap gap-3 py-10">
                {
                    currentPage > 0 &&
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="btn btn-primary text-black">&lt; Prev</button>

                }
                {
                    [...Array(totalPage).keys()].map((i) =>
                        <button onClick={() => setCurrentPage(i)} className={`btn ${i === currentPage && "btn-primary text-black"}`}>{i}</button>
                    )
                }
                {
                    currentPage < totalPage - 1 &&
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="btn btn-primary text-black">Next &gt;</button>
                }
            </div>
            <dialog ref={decoratorModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Decorators: {decorators.length}!</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {decorators.map((decorator, i) => <tr key={decorator._id}>
                                    <th>{i + 1}</th>
                                    <td>{decorator.displayName}</td>
                                    <td>{decorator.email}</td>
                                    <td>
                                        <button onClick={() => handleAssignDecorator(decorator)} className='btn btn-primary text-black'>Assign</button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageBookings;