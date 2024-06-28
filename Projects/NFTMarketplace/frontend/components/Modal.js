const Modal = ({isVisible, onClose, onOk, children}) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-700">
                        &times;
                    </button>
                </div>
                <div>{children}</div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onOk}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal