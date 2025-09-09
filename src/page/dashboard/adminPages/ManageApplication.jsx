import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdDeleteForever } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { TiMessages } from "react-icons/ti";
import PDFViewer from "../../../components/PDFViewer";

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const [openPositionDetails, setOpenPositionDetails] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  // For feedback modal
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [currentAppId, setCurrentAppId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Load open positions
  useEffect(() => {
    axiosPublic.get("/openPositions").then((res) => {
      setOpenPositionDetails(res.data);
    });
  }, [axiosPublic]);

  // Load applications
  useEffect(() => {
    axiosSecure.get("/applications").then((res) => {
      setApplications(res.data);

      // Debug: Log resume data structure
      console.log("Applications data:", res.data);
      res.data.forEach((app, index) => {
        console.log(`App ${index + 1} resume data:`, app.resume);
      });

      // Initialize selectedRoles with current roles
      const initialRoles = {};
      res.data.forEach((app) => {
        initialRoles[app._id] = app.role;
      });
      setSelectedRoles(initialRoles);
    });
  }, [axiosSecure]);

  // Handle role selection change (saved locally)
  const handleRoleSelect = (appId, newRole) => {
    setSelectedRoles((prev) => ({ ...prev, [appId]: newRole }));
  };

  // Add user with selected role
  const handelAdd = async (_id) => {
    try {
      const roleToSend = selectedRoles[_id];

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this! Role will be set to "${roleToSend}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add Member",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post(`/team/${_id}`, {
          role: roleToSend,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Remove the application locally after adding
        setApplications((prev) => prev.filter((app) => app._id !== _id));
        setSelectedRoles((prev) => {
          const copy = { ...prev };
          delete copy[_id];
          return copy;
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        (error.response?.status === 404
          ? "Endpoint not found - check server connection"
          : "Failed to add member");

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
      });
      console.error("Full error:", error);
    }
  };

  // Delete application
  const handelDelete = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/application/${_id}`);

        if (res.data.deletedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Application deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          setApplications((prev) => prev.filter((app) => app._id !== _id));
          setSelectedRoles((prev) => {
            const copy = { ...prev };
            delete copy[_id];
            return copy;
          });
        } else {
          throw new Error("Application not found or not deleted");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Delete",
      });
      console.error("Full error:", error);
    }
  };

  // Open feedback modal
  const openFeedbackModal = (appId) => {
    setCurrentAppId(appId);
    setFeedbackText("");
    setFeedbackModalOpen(true);
  };

  // Close feedback modal
  const closeFeedbackModal = () => {
    setCurrentAppId(null);
    setFeedbackText("");
    setFeedbackModalOpen(false);
  };

  // Submit feedback
  const submitFeedback = async () => {
    if (!feedbackText.trim()) {
      Swal.fire("Please enter feedback before submitting.");
      return;
    }

    try {
      await axiosSecure.patch(`/application/feedBack/${currentAppId}`, {
        message: feedbackText,
      });

      Swal.fire({
        icon: "success",
        title: "Feedback submitted successfully!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });

      closeFeedbackModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to submit feedback.",
      });
      console.error("Submit feedback error:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app.name}</td>
                <td>{app.phone}</td>
                <td>
                  <select
                    value={selectedRoles[app._id] || app.role}
                    onChange={(e) => handleRoleSelect(app._id, e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    {openPositionDetails.map((pos) => (
                      <option key={pos._id || pos.role} value={pos.role}>
                        {pos.role}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{app.researchArea}</td>
                <td>
                  <PDFViewer resumeData={app.resume} />
                </td>
                <td>
                  <button
                    onClick={() => handelAdd(app._id)}
                    className="btn text-2xl border-b-4 font-semibold text-green-900 hover:text-white hover:border-green-600 border-green-700 bg-green-100 hover:bg-green-500 transition-all duration-200"
                  >
                    <IoMdPersonAdd />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handelDelete(app._id)}
                    className="btn text-2xl border-b-4 font-semibold text-red-900 hover:text-white hover:border-red-600 border-red-700 bg-red-100 hover:bg-red-500 transition-all duration-200"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openFeedbackModal(app._id)}
                    className="btn border-b-4 text-2xl font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                  >
                    <TiMessages />
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeFeedbackModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Give Feedback</h3>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded p-2 mb-4 resize-none"
              placeholder="Enter feedback here"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={closeFeedbackModal} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={submitFeedback} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplication;
