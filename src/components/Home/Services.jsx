import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ServiceCard from "./ServiceCard";
import { useState } from "react";

const Services = () => {
    const [searchText, setSearchText] = useState("");
    const axios = useAxios();
    const { data: serviceData = [], isLoading } = useQuery({
        queryKey: ['serviceData', searchText],
        queryFn: async () => {
            const result = await axios(`/services?searchText=${searchText}`);
            return result.data;
        }
    });
    return (
        <div className="space-y-4">
            <h2 className="text-center text-4xl font-semibold">All Decoration Services</h2>
            <div className="flex justify-center">
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)} type="search" placeholder="Search by service name" />
                </label>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {serviceData.map(service =>
                    <ServiceCard key={service._id} service={service} />
                )}
            </div>
        </div>
    );
};

export default Services;