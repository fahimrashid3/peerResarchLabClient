import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit, FaEye } from "react-icons/fa";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

const fetchResearchPapers = async (axiosSecure, axiosPublic) => {
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

const ReviewResearch = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: papers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["research-papers"],
    queryFn: () => fetchResearchPapers(axiosSecure, axiosPublic),
  });

  const handleResearchPaper = (paper) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Publish Paper",
      denyButtonText: `Reject and delete paper`,
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: update the latest research id in research area
        axiosSecure.post(`/researchPaper/${paper._id}`).then((res) => {
          if (res.data.insertedId && res.data.deletedCount === 1) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Paper has been published",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something went wrong",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else if (result.isDenied) {
        axiosSecure.delete(`/ResearchRequest/${paper._id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Research Paper deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

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
                      document.getElementById("my_modal_4").showModal()
                    }
                    className="btn btn-success text-white btn-outline text-xl"
                  >
                    <FaEye />
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl space-y-5">
                      <h3 className="font-bold text-lg">{paper.title}</h3>
                      <h3 className="font-semibold text-base">
                        Category : {paper.category}
                      </h3>

                      <figure className="flex-shrink-0 flex justify-center rounded-lg">
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

                      <p className="py-4 text-justify">{paper.details}</p>
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
