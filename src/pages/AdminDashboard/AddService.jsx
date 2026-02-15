import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddService = () => {
    const {user} = useAuth();
    const axios = useAxios()
    const axiosSecure =useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddService = data => {
        data.cost = Number(data.cost);
        data.created_by = user.email;
        data.created_at = new Date().toISOString();
        const packageImg = data.packageImg[0];
        const formData = new FormData();
        formData.append("image", packageImg);
        const imgApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApi}`;
        axios.post(imgApiURL, formData)
            .then(res => {
                const packageImgURL = res.data.data.display_url;
                data.packageImgURL = packageImgURL;
                axiosSecure.post("/services", data)
                    .then(res => {
                        if(res.data.insertedId){
                            toast.success("Service added successfully");
                        }
                    }).catch(error => {
                        toast.error(error.message);
                    });
            }).catch(error => {
                toast.error(error.message);
            });
    }
    return (
        <div className="space-y-4">
            <title>Add Service</title>
            <h2 className="text-4xl font-bold">Add Decoration Service</h2>
            <form onSubmit={handleSubmit(handleAddService)} className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Service Name</label>
                    <input type="text" {...register("service_name", {
                        required: true,
                    })} className="input w-full" placeholder="Service Name" />
                    {
                        errors.service_name?.type === "required" &&
                        <p className="text-red-500">Service name is required</p>
                    }
                </div>
                <div>
                    <label className="label">Cost (BDT)</label>
                    <input type="text" {...register("cost", {
                        required: true,
                    })} className="input w-full" placeholder="Cost (BDT)" />
                    {
                        errors.cost?.type === "required" &&
                        <p className="text-red-500">Cost is required</p>
                    }
                </div>
                <div>
                    <label className="label">Unit</label>
                    <select {...register("unit", {
                        required: true,
                    })} className="select w-full" placeholder="Unit">
                        <option value="" disabled selected>Select Unit</option>
                        <option value="per sqr-ft">per sqr-ft</option>
                        <option value="per floor">per floor</option>
                        <option value="per meter">per meter</option>
                        <option value="per event">per event</option>
                        <option value="per session">per session</option>
                    </select>
                    {
                        errors.unit?.type === "required" &&
                        <p className="text-red-500">Unit is required</p>
                    }
                </div>
                <div>
                    <label className="label">Service Category</label>
                    <select type="text" {...register("service_category", {
                        required: true,
                    })} className="select w-full" placeholder="Service Category">
                        <option value="" disabled selected>Select Category</option>
                        <option value="home">home</option>
                        <option value="wedding">wedding</option>
                        <option value="office">office</option>
                        <option value="seminar">seminar</option>
                        <option value="meeting">meeting</option>
                    </select>
                    {
                        errors.service_category?.type === "required" &&
                        <p className="text-red-500">Service category is required</p>
                    }
                </div>
                <div>
                    <label className="label">Description</label>
                    <textarea {...register("description", {
                        required: true,
                    })} className="textarea w-full resize-none" rows={5} placeholder="Description" />
                    {
                        errors.description?.type === "required" &&
                        <p className="text-red-500">Description is required</p>
                    }
                </div>
                <div>
                    <label className="label">Package Image</label>
                    <input type="file" {...register("packageImg", {
                        required: true,
                    })} className="file-input w-full" />
                    {
                        errors.packageImg?.type === "required" &&
                        <p className="text-red-500">Package Image is required</p>
                    }
                </div>
                <div className="col-span-full">
                    <button className="btn btn-primary text-black">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;