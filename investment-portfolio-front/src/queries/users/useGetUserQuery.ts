import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { UserEntity } from "../../types";

export const useGetUserQuery = (user_id: string | null) => {
    const { apiGet } = useApi();

    const { data, refetch, error, isPending } = useQuery({
        queryKey: ['user', user_id],
        queryFn: async () => {
            return apiGet<UserEntity>(`/user/${user_id}`);
        }
    });

    return {
        data,
        refetch,
        error,
        isPending
    };
};
