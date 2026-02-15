import { Link } from "react-router";

const ServiceCard = ({service}) => {
    return (
        <div className="card bg-base-200 border border-neutral-300">
            <figure className="px-4 pt-4">
                <img
                    src={service.packageImgURL}
                    alt={service.service_name}
                    className="rounded-xl w-full h-40 object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{service.service_name}</h2>
                <p>Tk. {service.cost}</p>
                <p>{service.description}</p>
                <div className="card-actions">
                    <Link to={`/service/${service._id}`} className="btn btn-primary text-black">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;