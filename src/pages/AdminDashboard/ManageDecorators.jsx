import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../../components/shared/Loader";

const ManageDecorators = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const {data: users = [], isLoading, refetch} = useQuery({
        queryKey: ['users', user?.email, currentPage],
        queryFn: async () => {
            const result = await axiosSecure(`/users?limit=${limit}&skip=${currentPage * limit}`);
            const page = Math.ceil(result.data.total / limit);
            setTotalPage(page);
            return result.data.result;
        }
    });

    const handleMakeDecorator = id => {
        const updatedRole = {
            role: "decorator"
        };
        axiosSecure.patch(`/user/${id}/role`, updatedRole)
            .then(res => {
                if(res.data.modifiedCount){
                    refetch();
                    toast.success("Role updated");
                }
            });
    }

    if (isLoading) {
        return <Loader/>;
    }
    return (
        <div className="space-y-4">
            <title>Manage Decorators</title>
            <h2 className="text-4xl font-bold">Manage Decorators</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr key={user._id}>
                            <th>{index + (currentPage * limit) + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>{user.role}</td>
                            <th>
                                {user.role === "decorator" || <button onClick={() => handleMakeDecorator(user._id)} className="btn btn-primary text-black">Make Decorator</button>}
                            </th>
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
        </div>
    );
};

export default ManageDecorators;