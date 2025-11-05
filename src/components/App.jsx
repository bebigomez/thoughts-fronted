import { useEffect, useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import thoughtService from "../services/thoughts";

import MainPage from "./MainPage";
import PostDetails from "./PostDetails";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState([]);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
              .then((response) => response.json())
              .then((data) => {
                const city = data.address.city;
                const country = data.address.country;
                const countryCode = data.address.country_code;
                resolve({ city, country, countryCode });
              })
              .catch((error) => {
                reject(error);
              });
          },
          function () {
            resolve({
              city: "unknown",
              country: "unknown",
              countryCode: "unknown",
            });
          }
        );
      } else {
        reject("Geolocation is not available in this browser.");
      }
    });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocation();
        setLocation(location);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    thoughtService.getAll().then((initalPosts) => {
      const sortedPosts = initalPosts.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setPosts(sortedPosts);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainPage posts={posts} setPosts={setPosts} location={location} />}
        />
        <Route path="/thoughts/:id" element={<PostDetails />} />
      </Routes>
    </>
  );
};

export default App;
