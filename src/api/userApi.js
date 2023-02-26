import { get } from "src/services/restService"

export const getUsersApi = () => {
    return get('user/getAllUsers')
}