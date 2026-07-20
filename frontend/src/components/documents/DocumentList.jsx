import DocumentCard from "./DocumentCard";

function DocumentList({

    documents,

    selected,

    onSelect,

    onDeleted

}) {

    if (documents.length === 0) {

        return (

            <div className="text-gray-500 text-sm">

                No documents uploaded.

            </div>

        );

    }

    return (

        <div className="space-y-3">

            {

                documents.map((doc)=>(

                    <DocumentCard

                        key={doc.id}

                        document={doc}

                        selected={selected}

                        onSelect={onSelect}

                        onDeleted={onDeleted}

                    />

                ))

            }

        </div>

    );

}

export default DocumentList;