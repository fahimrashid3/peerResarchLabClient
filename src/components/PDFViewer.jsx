import React from "react";

const PDFViewer = ({ fileName, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 h-3/4 relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>
        <iframe
          src={`http://localhost:8000/uploads/${fileName}`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default PDFViewer;
