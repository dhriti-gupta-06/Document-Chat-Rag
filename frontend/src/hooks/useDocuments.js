import { useEffect, useState } from "react";
import api from "../services/api";

function useDocuments() {

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {

        try {

            const response = await api.get("/documents");

            setDocuments(response.data.documents);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDocuments();

    }, []);

    return {

        documents,

        loading,

        fetchDocuments

    };

}

export default useDocuments;