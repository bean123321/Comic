import { useState, useEffect } from "react";
import axios from "axios";

const useFetchComics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://otruyenapi.com/v1/api/home",
  };
  // Fetch comics from API
  const fetchComics = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      setComics(response.data.data.items);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  return { comics, loading, error };
};

export default useFetchComics;
