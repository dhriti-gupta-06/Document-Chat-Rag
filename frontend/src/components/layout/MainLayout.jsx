import { useRef, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import UploadCard from "../upload/UploadCard";
import ChatWindow from "../chat/ChatWindow";

import useDocuments from "../../hooks/useDocuments";
import useUpload from "../../hooks/useUpload";

function MainLayout() {

  const {
    documents,
    fetchDocuments
  } = useDocuments();

  const [selectedDocument, setSelectedDocument] = useState(null);

  const fileInputRef = useRef();

  const uploadSuccess = (document) => {

    fetchDocuments();

    setSelectedDocument(document);

  };

  const {
    uploadFile
  } = useUpload(uploadSuccess);

  const openUpload = () => {

    fileInputRef.current.click();

  };

  const handleDelete = (deletedId) => {

        fetchDocuments();

        if (selectedDocument?.id === deletedId) {

            setSelectedDocument(null);

        }

    };

  return (

    <div className="flex h-screen w-screen bg-[#0B1120]">

      <Sidebar

        documents={documents}

        selectedDocument={selectedDocument}

        setSelectedDocument={setSelectedDocument}

        onUploadClick={openUpload}

        onDeleted={handleDelete}


      />

      <input

        hidden

        ref={fileInputRef}

        type="file"

        accept=".pdf"

        onChange={(e) => {

          uploadFile(e.target.files[0]);

        }}

      />

      <div className="flex flex-col flex-1">

        <Topbar />

        <div className="flex-1 overflow-hidden p-8">

          {!selectedDocument ? (

            <UploadCard
              onUploadSuccess={uploadSuccess}
            />

          ) : (

            <ChatWindow
              document={selectedDocument}
            />

          )}

        </div>

      </div>

    </div>

  );

}

export default MainLayout;