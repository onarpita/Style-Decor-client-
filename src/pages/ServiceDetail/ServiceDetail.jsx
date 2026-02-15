import { Link, useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";

const ServiceDetail = () => {
    const {user} = useAuth();
    const service = useLoaderData();
    console.log(service);
    return (
        <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-2 gap-4">
            <title>{service.service_name}</title>
            <img src={service.packageImgURL} alt={service.service_name} className="w-full" />
            <div className="space-y-4">
                <h2 className="text-4xl font-semibold">{service.service_name}</h2>
                <p>{service.description}</p>
                <p><strong>Cost:</strong> Tk. {service.cost} {service.unit}</p>
                <p><strong>Category:</strong> {service.service_category}</p>
                {user && <Link to={`/book-service/${service._id}`} className="btn btn-primary text-black">Book Now</Link>}
            </div>
        </div>
    );
};

export default ServiceDetail;