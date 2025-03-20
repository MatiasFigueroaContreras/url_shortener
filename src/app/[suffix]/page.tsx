"use client";

import shortenedService from "@/services/ShortenedService";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SuffixRedirect() {
    const params = useParams<{ suffix: string }>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await shortenedService.get(params.suffix);
            const url = response.data.url;
            window.location.href = url;
        };
        fetchData();
    }, []);
}
