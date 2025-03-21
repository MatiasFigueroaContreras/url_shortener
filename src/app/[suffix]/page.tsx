"use client";

import shortenedService from "@/services/ShortenedService";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuffixRedirect() {
    const params = useParams<{ suffix: string }>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await shortenedService.get(params.suffix);
            const data = response?.data;
            if (!data) notFound();
            const currentTime = Math.floor(Date.now() / 1000);
            const createdAtTimestamp = Math.floor(
                new Date(data.created_at).getTime() / 1000
            );
            const expirationTimestamp =
                createdAtTimestamp + data.expiration_time;
            if (expirationTimestamp < currentTime) {
                alert("Este enlace ha expirado.");
                router.push("/");
                return;
            }

            shortenedService.createClick(params.suffix);

            const url = response.data.url;
            window.location.href = url;
        };
        fetchData();
    }, []);
}
