import axios from "axios";
import { useMutation } from "react-query";

const FARMBANK_BASE_URL = import.meta.env.VITE_FARMBANK_BASE_URL

type CreatePixRequest = {
	amount: number,
	email: string,
    phoneNumber: string,
}

export const createPayment = () => useMutation("createPayment", async (req: CreatePixRequest) => {
    return axios.post(`${FARMBANK_BASE_URL}/api/pix`, req)
})

export const warmupApi = async () => {
    return await axios.get(`${FARMBANK_BASE_URL}/api/warmup`)
}