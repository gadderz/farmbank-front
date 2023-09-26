import axios from "axios";
import { useMutation } from "react-query";

const MERCADO_PAGO_BASE_URL = import.meta.env.VITE_MERCADO_PAGO_BASE_URL
const TOKEN = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN

type CreatePixRequest = {
	amount: number,
	email: string,
}

export const createPayment = () => useMutation("createPayment", async (req: CreatePixRequest) => {
	const data = {
		transaction_amount: req.amount,
		description: "Farmbank pix",
    payment_method_id: "pix",
    payer: {
        email: req.email
    }
	}
	return axios.post(`${MERCADO_PAGO_BASE_URL}/v1/payments`, data, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		}
	})
})