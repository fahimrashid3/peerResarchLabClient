const JoinUsSectionDesign = ({ data }) => {
  const { status, role, qualifications, experience, internationalExposure } =
    data;
  return (
    <div className="border p-10 m-10 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="italic font-semibold">{status}</p>
          <p>
            <span className="font-bold text-lg">Role : </span>
            {role}
          </p>
          <p>
            <span className="font-bold text-lg">Qualifications : </span>
            {qualifications}
          </p>
          <p>
            <span className="font-bold text-lg">Experience : </span>
            {experience}
          </p>
          <p>
            <span className="font-bold text-lg">International Exposure : </span>
            {internationalExposure}
          </p>
        </div>
        <div>
          <button className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200">
            apply to be {role}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUsSectionDesign;
