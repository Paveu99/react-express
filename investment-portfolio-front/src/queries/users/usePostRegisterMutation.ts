import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { RegisterRes, UserEntity } from "../../types";

export const usePostRegisterMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { data, mutate, error, isPending } = useMutation({
        mutationKey: ['register'],
        mutationFn: async (credentials: UserEntity) => {
            return apiPost<RegisterRes, UserEntity>('/user/register', credentials);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['register']
            });
        }
    });

    return {
        data,
        mutate,
        error,
        isPending
    };
};
