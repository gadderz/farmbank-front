import axios from "axios";
import { useMutation } from "react-query";

const FARMBANK_BASE_URL = import.meta.env.VITE_FARMBANK_BASE_URL

type CreatePixRequest = {
    token?: string,
    installments?: number,
    issuerId?: string,
    paymentMethod: string,
	amount: number,
	email: string,
    phoneNumber: string,
}

export const createPayment = () => useMutation("createPayment", async (req: CreatePixRequest) => {
    return await axios.post(`${FARMBANK_BASE_URL}/api/payment`, req)
})

export const warmupApi = async () => {
    return await axios.get(`${FARMBANK_BASE_URL}/api/warmup`)
}