import { useState, useEffect } from "react";
import axios from "axios";

const useFetchComicDetails = (slug) => {
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`,
  };
  // Fetch comic details from API
  const fetchComicDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      setComic(response.data.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchComicDetails();
    }
  }, [slug]);

  return { comic, loading, error };
};

export default useFetchComicDetails;
