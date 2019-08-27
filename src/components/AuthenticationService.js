import axios from 'axios'
import { SESSION_USERNAME } from '../Constants'
import { API_URL } from '../Constants'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
            {headers: {authorization: this.createBasicAuthToken(username,password)}})
    }

    createBasicAuthToken(username,password) {
        let userToken = 'Basic ' +  window.btoa(username + ":" + password) 
        sessionStorage.setItem("USER_TOKEN", userToken)    // fix refresing issue
        return userToken
    }

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem(SESSION_USERNAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    logout() {
        sessionStorage.removeItem(SESSION_USERNAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(SESSION_USERNAME)
        if(user===null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(SESSION_USERNAME)
        if(user===null) return ''
        return user
    }

    setupAxiosInterceptors(basicAuthHeader) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()