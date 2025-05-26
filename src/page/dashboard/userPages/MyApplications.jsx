import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { VscFeedback } from "react-icons/vsc";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ✅ Fetch applications using useQuery
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${user.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const handleDelete = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/application/${_id}`);
        console.log(res);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Application deleted successfully",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to delete application",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to delete the application",
      });
    }
  };

  if (isLoading) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>University</th>
              <th>Research Area</th>
              <th>Role</th>
              <th>Details</th>
              <th>Action</th>
              <th>Notifications</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.university}</td>
                <td>{app.researchArea}</td>
                <td>{app.role}</td>
                <td className="whitespace-pre-wrap">{app.details}</td>
                <td>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="btn text-2xl border-b-4 font-semibold text-red-900 hover:text-white hover:border-red-600 border-red-700 bg-red-100 hover:bg-red-500 transition-all duration-200"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
                <td>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}

                  <button
                    className="btn w-16 text-xl border-b-4 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    <VscFeedback />
                  </button>

                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Feedback</h3>
                      <p className="py-4">{app.message}</p>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
