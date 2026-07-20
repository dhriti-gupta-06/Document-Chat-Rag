import { useRef } from "react";
import { UploadCloud } from "lucide-react";

import UploadProgress from "./UploadProgress";
import useUpload from "../../hooks/useUpload";

function UploadCard({ onUploadSuccess }) {
  const inputRef = useRef();

  const {
    uploadFile,
    uploading,
    progress
  } = useUpload(onUploadSuccess);

  return (
    <div
      className="bg-[#1F2937] border border-gray-700 rounded-2xl p-10 h-full flex items-center justify-center"

      onDragOver={(e) => e.preventDefault()}

      onDrop={(e) => {
        e.preventDefault();
        uploadFile(e.dataTransfer.files[0]);
      }}
    >
      <div className="text-center">

        <UploadCloud
          size={70}
          className="mx-auto text-blue-500 mb-6"
        />

        <h2 className="text-3xl font-bold">
          Upload your PDF
        </h2>

        <p className="text-gray-400 mt-3">
          Drag & Drop your document here
        </p>

        <button
          onClick={() => inputRef.current.click()}
          className="mt-8 bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-3 transition"
        >
          Choose PDF
        </button>

        <input
          hidden
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => uploadFile(e.target.files[0])}
        />

        {uploading && (
          <UploadProgress
            progress={progress}
          />
        )}

      </div>
    </div>
  );
}

export default UploadCard;