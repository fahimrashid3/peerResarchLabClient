const openPdfModal = async (pdfPath) => {
  try {
    const response = await axiosSecure.get(
      `/pdf-proxy?path=${encodeURIComponent(pdfPath)}`,
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    setPdfUrl(URL.createObjectURL(blob));
    setIsModalOpen(true);
  } catch (error) {
    console.error("Error loading PDF:", error);
  }
};

// Then use this in your modal:
<iframe
  src={pdfUrl}
  className="w-full h-full min-h-[70vh]"
  frameBorder="0"
></iframe>;
