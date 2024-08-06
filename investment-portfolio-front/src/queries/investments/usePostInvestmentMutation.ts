import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { AddRes, InvestmentEntity } from "../../types";

export const usePostInvestmentsMutation = (user_id: string | null) => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ['user_investments', user_id],
        mutationFn: async (payload: InvestmentEntity) => {
            return apiPost<AddRes, InvestmentEntity>(`/investments/add`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user_investments', user_id]
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