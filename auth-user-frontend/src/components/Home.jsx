import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/user`,
          {
            withCredentials: true,
          }
        );
        setUserData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(error.response.data);
          window.alert(
            `Failed to fetch user data: ${error.response.data.message}`
          );
        } else {
          window.alert("Failed to fetch user data");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        window.alert(`Logout failed: ${error.response.data.message}`);
      } else {
        window.alert("Logout failed");
      }
    }
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div>
        {userData ? (
          <>
            <img
              src={userData.data.avatar}
              alt="User Avatar"
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
            <p>
              <b>Username:</b> {userData.data.username}
            </p>
            <p>
              <b>Email:</b> {userData.data.email}
            </p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
};

export default Home;
