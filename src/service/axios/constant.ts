import AxiosInstance  from "axios"

export const axiosIntance = AxiosInstance.create({
    baseURL: "https://opentdb.com/api.php?amount=10",
    timeout: 10000
})