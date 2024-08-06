import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LocalView } from "./LocalView";

export const Header = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const styleOfLink = ({ isActive }: {
        isActive: boolean
    }
    ) => (
        {
            color: isActive ? "#a61b19" : '',
            backgroundColor: isActive ? "#fff" : '',
            padding: isActive ? "5px 150px" : "5px 100px",
            borderRadius: isActive ? '15px' : ""
        }
    )

    useEffect(() => {
        (async () => {
            if (sessionStorage.getItem('token2')?.length === 36) {
                setLoggedIn(true)
            }
        })()
    }, [])

    const login = <div style={{ display: "flex", gap: "10px" }}>
        <NavLink style={{ textDecoration: "none" }} to="/user/login">Log in</NavLink>
        |
        <NavLink style={{ textDecoration: "none" }} to="/user/register">Register</NavLink>
    </div>

    const user = <LocalView />

    return <header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>INVESTMENT APP</h1>
            <div>
                {loggedIn ? user : login}
            </div>
        </div>
        <hr />
        <div>
            <NavLink style={styleOfLink} to="/">Main page</NavLink>
            {loggedIn && <NavLink style={styleOfLink} to="/investment/list">Investments</NavLink>}
            {loggedIn && <NavLink style={styleOfLink} to="/investment/add">Market</NavLink>}
        </div>
        <hr />
    </header>
}