import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/applications").then((res) => setApplications(res.data));
  }, []);

  const openPdfModal = async (pdfPath) => {
    try {
      console.log("Fetching PDF from:", `http://localhost:8000/${pdfPath}`);

      // Fetch PDF as blob
      const response = await fetch(`http://localhost:8000/${pdfPath}`);
      const blob = await response.blob();
      setPdfBlob(URL.createObjectURL(blob));
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (pdfBlob) URL.revokeObjectURL(pdfBlob);
    setPdfBlob(null);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Research Area</th>
              <th>Resume</th>
              <th>Accept</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app.name}</td>
                <td>{app.phone}</td>
                <td>{app.role}</td>
                <td>{app.researchArea}</td>
                <td>
                  <button
                    onClick={() => openPdfModal(app.resume.path)}
                    className="btn border-b-4 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                  >
                    View PDF
                  </button>
                </td>
                <td>
                  <button className="btn text-2xl border-b-4 font-semibold text-green-900 hover:text-white hover:border-green-600 border-green-700 bg-green-100 hover:bg-green-500 transition-all duration-200">
                    <IoMdPersonAdd />
                  </button>
                </td>
                <td>
                  <button className="btn text-2xl border-b-4 font-semibold text-red-900 hover:text-white hover:border-red-600 border-red-700 bg-red-100 hover:bg-red-500 transition-all duration-200">
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Resume Preview</h3>
              <button onClick={closeModal} className="btn btn-sm btn-circle">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {pdfBlob && (
                <Document
                  file={pdfBlob}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="text-center py-8">Loading PDF...</div>
                  }
                  error={
                    <div className="text-center py-8 text-red-500">
                      Failed to load PDF
                    </div>
                  }
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <div key={`page_${index + 1}`} className="mb-4">
                      <Page
                        pageNumber={index + 1}
                        width={Math.min(800, window.innerWidth - 100)}
                      />
                      <p className="text-center text-sm text-gray-500 mt-1">
                        Page {index + 1} of {numPages}
                      </p>
                    </div>
                  ))}
                </Document>
              )}
            </div>
            <div className="modal-action">
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplication;
