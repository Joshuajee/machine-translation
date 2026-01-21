const Alert = ({ message, type }: { message: string; type: 'error' | 'success' }) => {
    const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
    const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';

    if (type === "error") {
        return (
            <div className="px-6 pb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-800">{message}</p>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${bgColor} border ${textColor} px-4 py-3 rounded relative mb-4`} role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    );
}


export default Alert;