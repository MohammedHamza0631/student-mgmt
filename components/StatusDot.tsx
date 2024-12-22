import React from "react";

const StatusDot = ({ status }: { status: "active" | "inactive" }) => {
    return (
        <div className="relative flex items-center justify-center">
            <div
                className={`h-3 w-3 rounded-full ${status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
            />
            <div
                className={`absolute h-3 w-3 rounded-full ${status === "active" ? "bg-green-500" : "bg-red-500"
                    } animate-ping opacity-75`}
            />
        </div>
    );
};

export default StatusDot;
