import { NavLink } from "react-router-dom";
import { useGetUserQuery } from "../queries/users/useGetUserQuery";

export const LocalView = () => {
    const name = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('token2');
    const { data } = useGetUserQuery(id);

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
            <b>
                Current balance: {data?.balance}$
            </b>
            |
            <b>
                <NavLink className="link" style={{ textDecoration: "none" }} to="/user/balance">{name}</NavLink>
            </b>
            |
            <b>
                <NavLink className="link" style={{ textDecoration: "none" }} to="/user/logout">Log out</NavLink>
            </b>
        </div>
    )
}