const Notification = ({ details, onClose }) => {
    const typeStyles = {
        info: "bg-blue-100 border-blue-500 text-blue-700",
        error: "bg-red-100 border-red-500 text-red-700",
    };

    const { type, title, message } = details;
    const styles = typeStyles[type] || "bg-gray-100 border-gray-500 text-gray-700";

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className={`border-l-4 p-4 rounded shadow-lg ${styles}`}>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p>{message}</p>
                <button
                    onClick={() => onClose()}
                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Notification