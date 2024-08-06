import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { AddRes } from "../../types"

export const useDeleteInvestmentsMutation = (user_id: string) => {
    const { apiDelete } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["user_investments", user_id],
        mutationFn: async (investmentId: string | undefined) => {
            return apiDelete<AddRes>(`/investments/${investmentId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user_investments", user_id],
            })
        },
    })

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess,
    }
}
