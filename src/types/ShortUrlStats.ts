type ShortUrlStats = {
    hits: number;
    unique_hits: number;
    countries_hits: Record<string, number>;
    browsers_hits: Record<string, number>;
    platforms_hits: Record<string, number>;
    devices_hits: Record<string, number>;
}

export default ShortUrlStats;