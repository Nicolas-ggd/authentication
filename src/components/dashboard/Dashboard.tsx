import { useNavigate } from "react-router-dom";
import axios from "axios";

import LogoutIcon from '@mui/icons-material/Logout';

export const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const userLogOut = async () => {
    await axios
      .post("http://localhost:8000/logout", {
        userId: userId,
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId");
        localStorage.removeItem("mobileNumber");
        localStorage.removeItem("userName");
        navigate("/");
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-full flex justify-center items-center margin-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center p-10">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {mobileNumber}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                onClick={userLogOut}
                className="inline-flex items-center px-4 transition duration-200 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <LogoutIcon /> 
                <span className="px-2">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
