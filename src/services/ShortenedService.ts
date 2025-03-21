import axios from "@/lib/axios";
import ShortUrl from "@/types/ShortUrl";
import ShortUrlStats from "@/types/ShortUrlStats";
import { AxiosResponse } from "axios";

const API_ENDPOINT = '/api/v1/shortened';

class ShortenedService {
    async get(suffix: string): Promise<AxiosResponse<ShortUrl, unknown>> {
        return await axios.get(`${API_ENDPOINT}/${suffix}/`)
    }

    async create(url: string): Promise<AxiosResponse<ShortUrl, unknown>> {
        return await axios.post(`${API_ENDPOINT}/`, { url })
    }

    async exists(suffix: string): Promise<AxiosResponse<boolean, unknown>> {
        return await axios.get(`${API_ENDPOINT}/${suffix}/exists/`)
    }

    async createClick(suffix: string): Promise<AxiosResponse<ShortUrl, unknown>> {
        return await axios.post(`${API_ENDPOINT}/${suffix}/clicks/`)
    }

    async getStats(suffix: string): Promise<AxiosResponse<ShortUrlStats, unknown>> {
        return await axios.get(`${API_ENDPOINT}/${suffix}/stats/`)
    }
}

const shortenedService = new ShortenedService();

export default shortenedService;