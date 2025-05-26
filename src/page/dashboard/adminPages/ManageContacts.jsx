import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";

const ManageContact = () => {
  const axiosSecure = useAxiosSecure();
  const [contacts, setContacts] = useState([]);
  const [replays, setReplays] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axiosSecure.get("adminContacts").then((res) => {
      setContacts(res.data);
    });
  }, [axiosSecure]);

  const handleInputChange = (e, contactId) => {
    setReplays((prev) => ({
      ...prev,
      [contactId]: e.target.value,
    }));
  };

  const handleSendReplay = () => {
    if (!selectedContact || !replays[selectedContact._id]) return;

    const contactInfo = {
      replay: replays[selectedContact._id],
      _id: selectedContact._id,
    };

    axiosSecure
      .patch("/contactReplay", contactInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact._id === selectedContact._id
                ? { ...contact, replay: replays[selectedContact._id] }
                : contact
            )
          );

          setReplays((prev) => ({
            ...prev,
            [selectedContact._id]: "",
          }));

          document.getElementById("reply_modal").close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Replay sent successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((error) => {
        console.error("Error sending replay:", error);
      });
  };

  return (
    <div className="-mt-20">
      <Helmet>
        <title>Manage Contacts</title>
      </Helmet>
      <SectionTitle
        heading="Manage Contacts"
        subHeading="All user messages here"
      />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id || index}>
                <th>{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <th>
                  {!contact.replay ? (
                    <button
                      className="btn btn-ghost btn-outline btn-success"
                      onClick={() => {
                        setSelectedContact(contact);
                        document.getElementById("reply_modal").showModal();
                      }}
                    >
                      Replay
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost btn-outline btn-warning"
                      onClick={() => {
                        setSelectedContact(contact);
                        document.getElementById("reply_modal").showModal();
                      }}
                    >
                      View
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal (Placed outside the loop for better performance) */}
      {selectedContact && (
        <dialog id="reply_modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">
              Message from {selectedContact.name}
            </h3>

            {/* User Message */}
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">{selectedContact.name}</div>
              <div className="chat-bubble">{selectedContact.message}</div>
            </div>

            {/* Show Replay if Available */}
            {selectedContact.replay && (
              <div className="chat chat-end mt-4">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Admin avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-bubble">{selectedContact.replay}</div>
                <div className="chat-footer opacity-50">Sent</div>
              </div>
            )}

            {/* Reply Input (Hidden if reply exists) */}
            {!selectedContact.replay && (
              <div className="flex gap-2 mt-4">
                <input
                  onChange={(e) => handleInputChange(e, selectedContact._id)}
                  type="text"
                  placeholder="Type your reply here"
                  className="input input-bordered flex-grow"
                  value={replays[selectedContact._id] || ""}
                />
                <button onClick={handleSendReplay} className="btn btn-neutral">
                  Send
                </button>
              </div>
            )}

            {/* Close Button */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageContact;
