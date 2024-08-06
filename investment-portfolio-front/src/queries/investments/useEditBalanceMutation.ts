import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { AddRes, BalanceChange } from "../../types";

export const useEditBalanceMutation = () => {
    const { apiPut } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ['user_balance'],
        mutationFn: async (payload: BalanceChange) => {
            return apiPut<AddRes, BalanceChange>(`/investments/update-balance`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user_balance']
            });
        }
    });

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess
    }
}