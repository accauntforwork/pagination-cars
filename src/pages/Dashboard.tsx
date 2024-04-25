import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex gap-4">
        <button
          onClick={() => {
            navigate("/1");
          }}
          className="btn bg-blue-700 text-white"
        >
          Click Pagination
        </button>
        <button
          onClick={() => {
            navigate("/scroll");
          }}
          className="btn bg-blue-700 text-white"
        >
          Scroll Pagination
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
