import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const BookingForm = () => {
    const {user} = useAuth();
    const service = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleBookService = data => {
        data.cost = Number(data.cost);
        axiosSecure.post("/booking", data)
            .then(res => {
                if(res.data.insertedId){
                    toast.success("Booking successful");
                }
            });
    }
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <title>Book your service</title>
            <div className="card bg-base-200 border border-neutral-300">
                <div className="card-body">
                    <h2 className="text-4xl font-semibold text-center mb-4">Book your service</h2>
                    <form onSubmit={handleSubmit(handleBookService)} className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Your Name</label>
                            <input type="text" {...register("name", {
                                required: true,
                            })} defaultValue={user?.displayName} className="input w-full" placeholder="YOur Name" />
                            {
                                errors.name?.type === "required" &&
                                <p className="text-red-500">Name is required</p>
                            }
                        </div>
                        <div>
                            <label className="label">Your Email</label>
                            <input type="text" {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            })} defaultValue={user?.email} className="input w-full" placeholder="Your Email" />
                            {
                                errors.email?.type === "required" &&
                                <p className="text-red-500">Email is required</p>
                            }
                            {
                                errors.email?.type === "pattern" &&
                                <p className="text-red-500">Invalid Email</p>
                            }
                        </div>
                        <div>
                            <label className="label">Service Name</label>
                            <input type="text" {...register("service_name", {
                                required: true,
                            })} defaultValue={service?.service_name} className="input w-full" placeholder="Service Name" />
                            {
                                errors.service_name?.type === "required" &&
                                <p className="text-red-500">Service name is required</p>
                            }
                        </div>
                        <div>
                            <label className="label">Cost</label>
                            <input type="text" {...register("cost", {
                                required: true,
                            })} defaultValue={service?.cost} className="input w-full" placeholder="Cost" />
                            {
                                errors.cost?.type === "required" &&
                                <p className="text-red-500">Cost is required</p>
                            }
                        </div>
                        <div>
                            <label className="label">Unit</label>
                            <input type="text" {...register("unit", {
                                required: true,
                            })} defaultValue={service?.unit} className="input w-full" placeholder="Unit" />
                            {
                                errors.unit?.type === "required" &&
                                <p className="text-red-500">Unit is required</p>
                            }
                        </div>
                        <div>
                            <label className="label">Booking Date</label>
                            <input type="date" {...register("booking_date", {
                                required: true,
                            })} className="input w-full" />
                            {
                                errors.booking_date?.type === "required" &&
                                <p className="text-red-500">Booking Date is required</p>
                            }
                        </div>
                        <div>
                            <label className="label">Your Location</label>
                            <input type="text" {...register("location", {
                                required: true,
                            })} className="input w-full" placeholder="Your Location" />
                            {
                                errors.location?.type === "required" &&
                                <p className="text-red-500">Location is required</p>
                            }
                        </div>
                        <div className="col-span-full">
                            <button className="btn btn-primary text-black">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;