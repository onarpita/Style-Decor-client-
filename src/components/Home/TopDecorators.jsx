import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import DecoratorCard from "./DecoratorCard";

const TopDecorators = () => {
    const axios = useAxios();
    const { data: decorators = [] } = useQuery({
        queryKey: ['decorators'],
        queryFn: async () => {
            const result = await axios(`/decorators`);
            return result.data;
        }
    });
    return (
        <div className="space-y-4">
            <h2 className="text-center text-4xl font-semibold">Top Decorators</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {decorators.map(decorator => 
                    <DecoratorCard key={decorator._id} decorator={decorator} />
                )}
            </div>
        </div>
    );
};

export default TopDecorators;