import React, { Component } from 'react'
//import {Link} from 'react-router-dom'  //Fix issue #1, component not rendered after login
import { Link, withRouter } from 'react-router-dom'  //Fix issue #1, component not rendered after login
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/rayljc/todo_console" className="navbar-brand">TodoConsole</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/admin">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

//export default HeaderComponent
export default withRouter(HeaderComponent)

/*
react-router-dom v5.x.x is not re-rendering the component after the user has logged in,
the system must valid the boolean value called isUserLoggedIn that is defined in
AuthenticationService.js, that value gets the item saved into the sessionStorage.
This issue does not appear in react-router-dom 4.3.1
*/