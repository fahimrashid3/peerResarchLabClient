import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosSecure.get("/applications").then((res) => setApplications(res.data));
  }, []);

  const downloadPdf = async (pdfPath) => {
    try {
      const res = await axiosPublic.get(`/${pdfPath}`, {
        responseType: "blob",
      });
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };
  const handelAdd = async (_id, role) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Make ${role}`,
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post(`/team/${_id}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
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
        } else {
          throw new Error("Application not found or not deleted");
        }
      }
    } catch (error) {
      const errorMsg = "Failed to Delete";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
      });
      console.error("Full error:", error);
    }
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
                    onClick={() => downloadPdf(app.resume.path)}
                    className="btn border-b-4 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                  >
                    View PDF
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handelAdd(app._id, app.role)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplication;
