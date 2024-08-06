import { useEffect } from "react";
import { useGetInvestmentsQuery } from "../queries/investments/useGetInvestmentsQuery";
import { SingleInvestment } from "./SingleInvestment";
import { useGetUserQuery } from "../queries/users/useGetUserQuery";

export const ListOfInvestmentsView = () => {
    const id = sessionStorage.getItem('token2');

    const { data, error, isLoading } = useGetInvestmentsQuery(id);
    const { refetch } = useGetUserQuery(id);

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data])

    return <div>
        <h2>List of investments</h2>
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading calculations: {error.message}</p>}
            {!data && <p>User has no investments in their account</p>}
            <ul style={{ textAlign: "left" }}>
                {data?.map((el) => (
                    <SingleInvestment element_details={el} />
                ))}
            </ul>
        </div>
    </div>
}