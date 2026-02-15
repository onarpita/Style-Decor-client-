import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Login = () => {
    const { user, signInUser, setUser, resetPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const emailRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        if (user && user?.email) navigate(`${location.state ? location.state : "/"}`);
    }, [navigate, user, location]);
    const handleLogin = data => {
        signInUser(data.email, data.password)
            .then(result => {
                setUser(result.user);
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                };
                axios.post(`${import.meta.env.VITE_baseURL}/users`, userInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            toast.success("Login successful");
                        }
                    });
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => {
                toast.error(error.code);
            });
    }
    const handleResetPassword = () => {
        resetPassword(email)
            .then(() => {
                toast.success("Password reset link sent to your email. Please check.");
            })
            .catch((error) => {
                toast.error(error.code);
            });
    }
    return (
        <div className="p-4 min-h-screen flex justify-center items-center">
            <title>Login</title>
            <div className="card bg-base-300 w-full max-w-sm">
                <div className="card-body">
                    <h2 className="text-center font-semibold text-3xl">Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })} onChange={(e) => setEmail(e.target.value)} className="input w-full" placeholder="Email" />
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
                        })} className="input w-full" placeholder="Password" />
                        {
                            errors.password?.type === "required" &&
                            <p className="text-red-500">Password is required</p>
                        }
                        <div><a onClick={handleResetPassword} className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;