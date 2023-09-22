import axios from "axios";

const BASE_URL = import.meta.env.FARM_BANK_API_URL

type CreatePixResponse = {

}

export const createPixAsync = async () => {
    try {
        await axios.post<CreatePixResponse>(
            BASE_URL,
        );
    } catch (error) {
        
    }
};