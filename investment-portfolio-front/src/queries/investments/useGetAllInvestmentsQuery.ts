import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { InvestmentEntity } from "../../types"

export const useGetAllInvestmentsQuery = () => {
    const { apiGet } = useApi()
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["investments"],
        queryFn: async () => {
            return apiGet<InvestmentEntity[]>(`/investments`)
        }
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
