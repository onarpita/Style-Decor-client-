import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
    const { user, updateUser, setLoading } = useAuth();
    const navigate = useNavigate();
    const { photoURL, displayName } = user;
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;

        if (name === "") {
            toast.error("Name required");
            return;
        }

        else if (image === "") {
            toast.error("Photo URL required");
            return;
        }

        updateUser({displayName: name, photoURL: image}).then(() => {
            setLoading(false);
            navigate("/dashboard/user-profile");
        }).catch(error => {
            toast.error(error.code);
        });
    }
    return (
        <div className="max-w-2xl mx-auto">
            <div className="card bg-base-300">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-semibold">Update Profile</h2>
                    <form onSubmit={handleUpdateProfile} className="fieldset">
                        <div>
                            <label className="label">Name</label>
                            <input type="text" defaultValue={displayName} name="name" className="input w-full mt-2" placeholder="Name" />
                        </div>
                        <div>
                            <label className="label">Photo URL</label>
                            <input type="text" defaultValue={photoURL} name="image" className="input w-full mt-2" placeholder="Photo URL" />
                        </div>
                        <button type="submit" className="btn btn-neutral mt-4">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;