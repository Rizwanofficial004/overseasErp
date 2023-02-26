import { post, deleteReq } from "src/services/restService"

export const signUpApi = (data) => {
    return post('auth/signUp', data)
}
export const signInApi = (data) => {
    return post('auth/signin', data)
}
export const signOutApi = (refreshToken) => {
  console.log("****refreshToken", {refreshToken});

    return deleteReq('auth/signOut', {refreshToken})
}
export const refreshTokenApi = (data) => {
    return post('auth/refreshToken', data)
}