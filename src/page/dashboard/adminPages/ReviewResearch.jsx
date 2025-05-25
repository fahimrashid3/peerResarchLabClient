import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit, FaEye } from "react-icons/fa";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { TiMessages } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ReviewResearch = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchResearchPapers = async () => {
    const res = await axiosSecure.get("/ResearchRequest");
    const paperList = res.data;

    const enrichedPapers = await Promise.all(
      paperList.map(async (paper) => {
        try {
          const response = await axiosPublic.get(`/post/${paper.authorEmail}`);
          return { ...paper, author: response.data };
        } catch (err) {
          console.error(`Error fetching author for ${paper.authorEmail}:`, err);
          return { ...paper, author: null };
        }
      })
    );

    return enrichedPapers;
  };

  const {
    data: papers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["research-papers"],
    queryFn: fetchResearchPapers,
  });

  const onSubmit = async (data) => {
    if (!selectedPaperId) return;

    const message = { message: data.message };

    try {
      const res = await axiosSecure.patch(
        `/feedBack/${selectedPaperId}`,
        message
      );

      if (res.data.result?.modifiedCount > 0 || res.data.result?.upsertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Feedback sent successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        reset();
        refetch();
        document.getElementById(`feedback_${selectedPaperId}`).close();
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleResearchPaper = (paper) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Publish Paper",
      denyButtonText: `Reject and delete paper`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/researchPaper/${paper._id}`).then((res) => {
          if (res.data.insertedId && res.data.deletedCount === 1) {
            Swal.fire("Published!", "Paper has been published.", "success");
            refetch();
          }
        });
      } else if (result.isDenied) {
        axiosSecure.delete(`/ResearchRequest/${paper._id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            Swal.fire("Deleted!", "Research Paper deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">This is the review page</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Author</th>
              <th>Category</th>
              <th>Title</th>
              <th>View</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, index) => (
              <tr key={paper._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            paper.author?.photoUrl ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Author Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {paper.author?.name || "Unknown"}
                      </div>
                      <div className="text-sm opacity-50">
                        {paper.authorEmail || "No email"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{paper.category}</td>
                <td>{paper.title}</td>

                <td>
                  <button
                    onClick={() =>
                      document.getElementById(`view_${paper._id}`).showModal()
                    }
                    className="btn btn-success text-white btn-outline text-xl"
                  >
                    <FaEye />
                  </button>

                  {/* VIEW MODAL */}
                  <dialog id={`view_${paper._id}`} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl space-y-5">
                      <h3 className="font-bold text-lg">{paper.title}</h3>
                      <figure className="flex justify-center rounded-lg">
                        <img
                          className="h-64 rounded-lg object-cover"
                          src={paper.image}
                          alt={paper.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://res.cloudinary.com/dipwayvsu/image/upload/v1745146763/uauic3zxcvxvdepwl3dk.webp";
                          }}
                        />
                      </figure>
                      <div className="space-y-1">
                        <p>
                          <strong>Publisher:</strong> {paper.publisher || "N/A"}
                        </p>
                        <p>
                          <strong>DOI:</strong> {paper.doi || "N/A"}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {paper.publicationDate
                            ? new Date(paper.publicationDate).toDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Authors:</strong>{" "}
                          {paper.authors?.join(", ") || paper.authorName}
                        </p>
                      </div>
                      <p className="text-justify whitespace-pre-line">
                        {paper.details}
                      </p>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

                <td>
                  <button
                    className="btn text-2xl btn-outline"
                    onClick={() => {
                      setSelectedPaperId(paper._id);
                      document
                        .getElementById(`feedback_${paper._id}`)
                        .showModal();
                    }}
                  >
                    <TiMessages />
                  </button>

                  {/* FEEDBACK MODAL */}
                  <dialog id={`feedback_${paper._id}`} className="modal">
                    <div className="modal-box">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById(`feedback_${paper._id}`)
                              .close()
                          }
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </button>
                        <h3 className="font-bold text-lg">Write Feedback</h3>
                        <textarea
                          {...register("message", {
                            required: "Message is required",
                          })}
                          defaultValue={paper.message || ""}
                          placeholder="Feedback message"
                          className="textarea textarea-neutral w-full border-dark-600 border-2"
                        />
                        {errors.message && (
                          <p className="text-red-500">
                            {errors.message.message}
                          </p>
                        )}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="btn btn-accent text-white"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </td>

                <td>
                  <button
                    className="btn btn-warning text-white btn-outline text-xl"
                    onClick={() => handleResearchPaper(paper)}
                  >
                    <FaEdit />
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

export default ReviewResearch;
