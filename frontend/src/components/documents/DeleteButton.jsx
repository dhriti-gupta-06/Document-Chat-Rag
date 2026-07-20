import { Trash2 } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

function DeleteButton({
    documentId,
    filename,
    onDeleted
}) {

    const deleteDoc = async (e) => {

        e.stopPropagation();

        const ok = window.confirm(
            `Delete "${filename}" ?`
        );

        if (!ok) return;

        try {

            await api.delete(
                `/document/${documentId}`
            );

            toast.success("Document deleted");

            onDeleted(documentId);

        }

        catch {

            toast.error("Unable to delete document.");

        }

    };

    return (

        <button

            onClick={deleteDoc}

            className="text-red-400 hover:text-red-500"

        >

            <Trash2 size={16}/>

        </button>

    );

}

export default DeleteButton;