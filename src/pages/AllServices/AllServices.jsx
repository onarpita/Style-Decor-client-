import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import ServiceCard from "../../components/Home/ServiceCard";

const AllServices = () => {
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("service_name");
    const [order, setOrder] = useState("");
    const axios = useAxios();
    const { data: serviceData = [], isLoading } = useQuery({
        queryKey: ['serviceData', searchText, sort, order],
        queryFn: async () => {
            const result = await axios(`/services?searchText=${searchText}&sort=${sort}&order=${order}`);
            return result.data;
        }
    });
    const handleSelect = e => {
        const sortText = e.target.value;
        setSort(sortText.split("-")[0]);
        setOrder(sortText.split("-")[1]);
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <h2 className="text-center text-4xl font-semibold">All Decoration Services</h2>
            <div className="flex gap-4 justify-between max-md:flex-col">
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
                <div className="">
                    <select onChange={handleSelect} className="select">
                        <option selected disabled={true}>
                            Sort by Service Name / Cost
                        </option>
                        <option value={"service_name-desc"}>Service Name : High - Low</option>
                        <option value={"service_name-asc"}>Service Name : Low - High</option>
                    </select>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {serviceData.map(service =>
                    <ServiceCard key={service._id} service={service} />
                )}
            </div>
        </div>
    );
};

export default AllServices;