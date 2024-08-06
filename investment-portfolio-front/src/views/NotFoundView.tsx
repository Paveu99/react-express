import { NavLink } from "react-router-dom"

export const NotFoundView = () => {
    return <div>
        <p>Not found view</p>
        <p>Go back to the <NavLink to='/'>Home page</NavLink></p>
    </div>
}