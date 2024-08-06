import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { InvestmentEntity } from "../../types"

export const useGetInvestmentsQuery = (user_id: string | null) => {
    const { apiGet } = useApi()
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["user_investments", user_id],
        queryFn: async () => {
            return apiGet<InvestmentEntity[]>(`/investments/${user_id}`)
        },
        enabled: !!user_id,
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
