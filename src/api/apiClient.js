import axios from 'axios';

// import accessEnv from "#root/helpers/accessEnv"

const BROKRETE_BACKEND_API = 'http://localhost:8001/v1'

export default class RegalVoiceService {

    // Users
    // these are sample calls
    static async fetchUsers() {
        const body = await axios.get(`${BROKRETE_BACKEND_API}/users`);
        return body.data.customers;
    }

    static async createUser({ first_name, last_name, email }) {
        return await axios.post(`${BROKRETE_BACKEND_API}/users`, { 
            first_name, last_name, email
        });
    }

}