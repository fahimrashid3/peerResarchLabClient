import Swal from "sweetalert2";

const PDFViewer = ({
  resumeData,
  buttonText = "View PDF",
  buttonClass = "",
}) => {
  // Check if resume data is valid
  const isValidResume = (resumeData) => {
    return resumeData && resumeData.url && typeof resumeData.url === "string";
  };

  // View resume PDF in new tab
  const viewPdf = (resumeData) => {
    try {
      console.log("Attempting to view PDF with data:", resumeData);

      if (!resumeData?.url) {
        Swal.fire({
          icon: "error",
          title: "View Failed",
          text: "Resume URL not found.",
        });
        return;
      }

      // Use Google Docs viewer to display PDF in browser
      const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        resumeData.url
      )}&embedded=true`;
      window.open(googleDocsUrl, "_blank");
    } catch (error) {
      console.error("Error viewing PDF:", error);
      Swal.fire({
        icon: "error",
        title: "View Failed",
        text: "Unable to view the PDF. Please try again later.",
      });
    }
  };

  if (!isValidResume(resumeData)) {
    return <span className="text-red-500 text-sm">No resume</span>;
  }

  return (
    <button
      onClick={() => viewPdf(resumeData)}
      className={`btn btn-sm border-b-4 font-semibold text-blue-900 hover:text-white hover:border-blue-600 border-blue-700 bg-blue-100 hover:bg-blue-500 transition-all duration-200 ${buttonClass}`}
    >
      {buttonText}
    </button>
  );
};

export default PDFViewer;
