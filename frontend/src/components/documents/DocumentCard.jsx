import {

    FileText,

    Calendar,

    Layers

} from "lucide-react";

import DeleteButton from "./DeleteButton";

function DocumentCard({

    document,

    selected,

    onSelect,

    onDeleted

}) {

    return (

        <div

            onClick={()=>onSelect(document)}

            className={`

            rounded-xl

            p-4

            cursor-pointer

            transition

            border

            ${selected?.id===document.id

                ? "border-blue-500 bg-blue-900/20"

                : "border-gray-700 bg-[#1F2937] hover:border-blue-500"

            }

            `}

        >

            <div className="flex justify-between">

                <div className="flex gap-3">

                    <FileText
                        className="text-blue-500"
                    />

                    <div>

                        <h3 className="font-semibold">

                            {document.filename}

                        </h3>

                        <div className="text-xs text-gray-400 mt-2">

                            <div className="flex gap-2 items-center">

                                <Calendar size={12}/>

                                {document.uploaded_at}

                            </div>

                            <div className="flex gap-2 items-center mt-1">

                                <Layers size={12}/>

                                {document.pages} pages • {document.chunks} chunks

                            </div>

                        </div>

                    </div>

                </div>

                <DeleteButton

                    documentId={document.id}

                    filename={document.filename}

                    onDeleted={onDeleted}

                />

            </div>

        </div>

    );

}

export default DocumentCard;