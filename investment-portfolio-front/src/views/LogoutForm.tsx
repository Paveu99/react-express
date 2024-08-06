import { NavLink } from "react-router-dom";

export const LogoutForm = () => {
    const logout = () => {
        sessionStorage.clear()
        window.location.replace("http://localhost:5173");
    }

    return (<div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h2>Are you sure about that?</h2>
        <div style={{ display: 'flex', gap: "10px", justifyContent: "center", width: "max-content" }}>
            <button className='download' onClick={logout}>Yes</button>
            <hr />
            <NavLink to="/">
                <button className='download3'>No</button>
            </NavLink>
        </div>
    </div>
    )
}