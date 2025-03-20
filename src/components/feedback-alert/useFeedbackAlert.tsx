import { useState } from "react";

interface FeedbackAlertState {
    message: string;
    type?: "success" | "error" | "info";
}

export const useFeedbackAlert = () => {
    const [feedback, setFeedback] = useState<FeedbackAlertState | null>(null);

    const showFeedback = (
        message: string,
        type: FeedbackAlertState["type"] = "info"
    ) => {
        setFeedback({ message, type });
    };

    const hideFeedback = () => {
        setFeedback(null);
    };

    return { feedback, showFeedback, hideFeedback };
};
