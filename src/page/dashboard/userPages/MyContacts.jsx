import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { FaEye } from "react-icons/fa";

const MyContacts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/contacts/${user.email}`)
        .then((res) => {
          setContacts(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
          setLoading(false);
        });
    }
  }, [axiosSecure, user?.email]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-950 dark:text-white">
        My Contacts
      </h2>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow border border-gray-200 dark:border-gray-800">
        <div className="overflow-x-auto rounded-lg">
          <table className="table bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
            <thead className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
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
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white dark:bg-gray-900">
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis text-justify">
                          {contact.message}
                        </p>
                        <hr className="my-2 border-gray-200 dark:border-gray-800" />
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis text-right">
                          {contact.replay}
                        </p>
                      </div>
                    ) : (
                      <p className="overflow-hidden whitespace-nowrap text-ellipsis text-justify max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-200 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-900">
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
                      <div className="modal-box w-11/12 max-w-5xl bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
                        <h3 className="font-bold text-lg">{contact.name}</h3>
                        <div className="chat chat-start">
                          <div className="chat-bubble text-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                            {contact.message}
                          </div>
                        </div>
                        {contact.replay && (
                          <div className="chat chat-end">
                            <div className="chat-bubble bg-primary-600 text-white">
                              {contact.replay}
                            </div>
                          </div>
                        )}
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn btn-outline">Close</button>
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
    </div>
  );
};

export default MyContacts;
