import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { LoginRes, UserReturned } from "../../types";

export const usePostLoginMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { data, mutate, error, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (credentials: Omit<UserReturned, 'balance'>) => {
            return apiPost<LoginRes, Omit<UserReturned, 'balance'>>('/user/login', credentials);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['login']
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
