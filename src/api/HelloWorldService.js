import axios from 'axios'
import { API_URL } from '../Constants'

class HelloWorldService {
    
    executeHelloWorldService() {
        //console.log('executed service')
        return axios.get(`${API_URL}/hello-world`);        
    }

    executeHelloWorldBeanService() {
        //console.log('executed service')
        return axios.get(`${API_URL}/hello-world-bean`);        
    }

    executeHelloWorldPathVariableService(name) {
        //console.log('executed service')
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`);        
    }
}

export default new HelloWorldService()