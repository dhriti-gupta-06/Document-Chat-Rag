import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function useUpload(onSuccess) {

    const [uploading, setUploading] = useState(false);

    const [progress, setProgress] = useState(0);

    const uploadFile = async (file) => {

        if (!file) return;

        if (file.type !== "application/pdf") {

            toast.error("Only PDF files allowed.");

            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setUploading(true);

            const response = await api.post(
                "/upload",
                formData,
                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    },

                    onUploadProgress: (event) => {

                        setProgress(
                            Math.round(
                                (event.loaded * 100) / event.total
                            )
                        );

                    }

                }
            );

            toast.success("Uploaded Successfully");

            onSuccess({

                id: response.data.document_id,

                filename: response.data.filename,

                pages: response.data.pages,

                chunks: response.data.chunks

            });

        }

        catch {

            toast.error("Upload Failed");

        }

        finally {

            setUploading(false);

            setProgress(0);

        }

    };

    return {

        uploadFile,

        uploading,

        progress

    };

}

export default useUpload;