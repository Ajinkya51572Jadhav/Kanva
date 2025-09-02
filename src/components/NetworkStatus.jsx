import { useEffect } from "react";

function NetworkStatus({ messageApi }) {
    useEffect(() => {
        const handleOnline = () => {
            messageApi.success("online", 5);
        };

        const handleOffline = () => {
            messageApi.error("offline", 5);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [messageApi]);

    return null; // nothing to render
}

export default NetworkStatus;
