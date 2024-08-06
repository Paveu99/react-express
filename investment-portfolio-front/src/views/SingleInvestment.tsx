import { useDeleteInvestmentsMutation } from "../queries/investments/useDeleteInvestmentMutation";
import { InvestmentEntity } from "../types";

type Props = {
    element_details: InvestmentEntity,
}

export const SingleInvestment = ({ element_details }: Props) => {

    const { mutate } = useDeleteInvestmentsMutation(element_details.user_id);

    return <li className="record-li"
        style={{
            margin: "5px 0 10px 0",
            width: "fit-content"
        }}
        key={element_details.id}
    >
        <strong>Name:</strong> {element_details.name} &nbsp;
        <strong>Price:</strong> {element_details.price}$ &nbsp;
        <strong>Quantity:</strong> {element_details.quantity} &nbsp;
        <button onClick={() => mutate(element_details.id)}>Delete</button>
    </li>

}