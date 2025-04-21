import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import ScrollToTop from "../../../components/ScroolToTop";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handelMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an admin now`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  return (
    <div className="-mt-24">
      <SectionTitle
        heading={"ALL Users"}
        subHeading={"manage users"}
      ></SectionTitle>
      <h1 className="text-center text-3xl">Total Users : {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Job</th>
              <th>email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role ? (
                    <p>{user.role}</p>
                  ) : (
                    <button
                      className="btn btn-warning text-white btn-outline text-xl"
                      onClick={() => handelMakeAdmin(user)}
                    >
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default AllUsers;
