import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { FaEye } from "react-icons/fa";

const MyContacts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/contacts/${user.email}`)
        .then((res) => {
          setContacts(res.data);
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [axiosSecure, user?.email]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="-mt-20">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th> {/* Renamed from "Profile" to "Actions" */}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <th>{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>
                  {contact.replay ? (
                    <div className="border rounded-lg p-2 w-96">
                      <p className="max-w-[50%] overflow-hidden whitespace-nowrap text-ellipsis text-justify">
                        {contact.message}
                      </p>
                      <hr />

                      <p className="overflow-hidden whitespace-nowrap text-ellipsis text-right">
                        {contact.replay}
                      </p>
                    </div>
                  ) : (
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis text-justify w-96 border p-4 rounded-lg">
                      {contact.message}
                    </p>
                  )}
                </td>
                <td>
                  {/* Button to open modal */}
                  <button
                    className="btn btn-ghost btn-outline btn-success text-2xl"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${contact._id}`)
                        .showModal()
                    }
                  >
                    <FaEye />
                  </button>
                  {/* Modal */}
                  <dialog id={`my_modal_${contact._id}`} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">{contact.name}</h3>
                      <div className="chat chat-start">
                        <div className="chat-bubble text-lg">
                          {contact.message}
                        </div>
                      </div>
                      {contact.replay && (
                        <div className="chat chat-end">
                          <div className="chat-bubble">{contact.replay}</div>
                        </div>
                      )}
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContacts;
