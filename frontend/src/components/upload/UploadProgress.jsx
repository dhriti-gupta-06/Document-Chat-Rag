function UploadProgress({ progress }) {
    return (
        <div className="w-full mt-4">

            <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Uploading...</span>
                <span>{progress}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">

                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>
    );
}

export default UploadProgress;