import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import Axios from 'axios';

class AuthenticatedRoute extends Component {    

    // fix refreshing issue
    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }

    // fix refreshing issue
    setupAxiosInterceptors() {
        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem("USER_TOKEN")
                }
                return config
            }
        )
    }

    // fix refreshing issue
    componentWillMount() {
        this.setupAxiosInterceptors()
    }

    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute