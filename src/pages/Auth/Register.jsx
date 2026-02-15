import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const Register = () => {
    const { user, registerUser, setUser, updateUser, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        if (user && user?.email) navigate(`${location.state ? location.state : "/"}`);
    }, [navigate, user, location]);
    const handleRegistration = data => {
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(result => {
                const formData = new FormData();
                formData.append("image", profileImg);
                const imgApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApi}`;
                axios.post(imgApiURL, formData)
                    .then(res => {
                        const photoURL = res.data.data.display_url;
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        };
                        axios.post(`${import.meta.env.VITE_baseURL}/users`, userInfo)
                            .then(res => {
                                if(res.data.insertedId){
                                    toast.success("Registration successful");
                                }
                            });

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUser(userProfile)
                            .then(() => {
                                setUser(result.user);
                                setLoading(false);
                                navigate(`${location.state ? location.state : "/"}`);
                            })
                            .catch(error => {
                                toast.error(error.code);
                            });
                    })
                    .catch(error => {
                        toast.error(error.code);
                    });
            })
            .catch(error => {
                toast.error(error.code);
            });
    }
    return (
        <div className="p-4 min-h-screen flex justify-center items-center">
            <title>Register</title>
            <div className="card bg-base-300 w-full max-w-sm">
                <div className="card-body">
                    <h2 className="text-center font-semibold text-3xl">Register</h2>
                    <form onSubmit={handleSubmit(handleRegistration)} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" {...register("name", {
                            required: true,
                        })} className="input w-full" placeholder="Name" />
                        {
                            errors.name?.type === "required" &&
                            <p className="text-red-500">Name is required</p>
                        }
                        <label className="label">Photo</label>
                        <input type="file" {...register("photo", {
                            required: true,
                        })} className="file-input w-full" />
                        {
                            errors.photo?.type === "required" &&
                            <p className="text-red-500">Photo is required</p>
                        }
                        <label className="label">Email</label>
                        <input type="email" {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })} className="input w-full" placeholder="Email" />
                        {
                            errors.email?.type === "required" &&
                            <p className="text-red-500">Email is required</p>
                        }
                        {
                            errors.email?.type === "pattern" &&
                            <p className="text-red-500">Invalid Email</p>
                        }
                        <label className="label">Password</label>
                        <input type="password" {...register("password", {
                            required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":;{}|<>])\S{8,}$/
                        })} className="input w-full" placeholder="Password" />
                        {
                            errors.password?.type === "required" &&
                            <p className="text-red-500">Password is required</p>
                        }
                        {
                            errors.password?.type === "pattern" &&
                            <p className="text-red-500">Password must be at least 8 characters and have at least one uppercase letter, one lowercase letter, one number, one special character and not contain whitespace.</p>
                        }
                        <button className="btn btn-neutral mt-4">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;