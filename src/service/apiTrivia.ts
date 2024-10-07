import { axiosIntance } from "./axios/constant"
import { TriviaEndpoint } from "./axios/network"

export const getAllTrivia = async () => {
    return axiosIntance.get(TriviaEndpoint)
}

export const getTriviaById = async (id: string) => {
    return axiosIntance.get(`${TriviaEndpoint}/${id}`)
}