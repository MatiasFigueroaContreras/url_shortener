import axios from "@/lib/axios";
import { ShortUrl } from "@/types/ShortUrl";
import { AxiosResponse } from "axios";

const API_ENDPOINT = '/api/v1/shortened';

class ShortenedService {
    async get(suffix: string): Promise<AxiosResponse<ShortUrl, unknown>> {
        return await axios.get(`${API_ENDPOINT}/${suffix}`)
    }

    async create(url: string): Promise<AxiosResponse<ShortUrl, unknown>> {
        return await axios.post(API_ENDPOINT, { url })
    }

    async exists(suffix: string): Promise<AxiosResponse<ShortUrl, unknown>> {
        return await axios.get(`${API_ENDPOINT}/${suffix}/exists`)
    }
}

const shortenedService = new ShortenedService();

export default shortenedService;