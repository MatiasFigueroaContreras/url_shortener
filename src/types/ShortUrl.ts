import ClickInfo from "./ClickInfo";

type ShortUrl = {
    url: string;
    suffix: string;
    created_at: string;
    expiration_time: number;
    hits: number;
    clicks: ClickInfo[];
}

export default ShortUrl;