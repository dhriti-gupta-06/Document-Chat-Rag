import {
  Upload,
  Settings
} from "lucide-react";

import DocumentList from "../documents/DocumentList";

function Sidebar({

  documents,

  selectedDocument,

  setSelectedDocument,

  onUploadClick,

  onDeleted

}) {

  return (

    <aside className="w-72 bg-[#111827] border-r border-gray-800 flex flex-col">

      <div className="p-8">

        <h1 className="text-3xl font-bold">

          📄 DocuMind

        </h1>

        <p className="text-gray-400 mt-2">

          Chat with Any PDF

        </p>

      </div>

      <div className="px-6">

        <button

          onClick={onUploadClick}

          className="

            w-full

            rounded-xl

            bg-blue-600

            hover:bg-blue-700

            transition

            py-3

            flex

            items-center

            justify-center

            gap-3

          "

        >

          <Upload size={20} />

          Upload PDF

        </button>

      </div>

      <div className="flex-1 overflow-auto mt-8 px-5">

        <div className="text-gray-400 mb-4">

          Documents

        </div>

        <DocumentList

          documents={documents}

          selected={selectedDocument}

          onSelect={setSelectedDocument}

          onDeleted={onDeleted}

        />

      </div>

      <div className="border-t border-gray-800 p-6">

        <button

          className="flex items-center gap-3 text-gray-400 hover:text-white"

        >

          <Settings size={20} />

          Settings

        </button>

      </div>

    </aside>

  );

}

export default Sidebar;