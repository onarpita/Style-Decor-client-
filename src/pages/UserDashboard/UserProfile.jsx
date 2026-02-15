import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
    const {user} = useAuth();
    return (
        <div className="space-y-4">
            <title>My Profile</title>
            <h2 className="text-4xl font-bold">My Profile</h2>
            <div className="max-w-4xl mx-auto">
                <div className="card bg-base-200 border border-neutral-300">
                    <div className="card-body items-center text-center">
                        <img src={user.photoURL} className="w-20" />
                        <h3 className="text-3xl font-semibold">{user.displayName}</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <Link to="/dashboard/update-profile" className="btn btn-primary text-black">Update Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;