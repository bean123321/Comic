import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCategoryDetails = (slug) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://otruyenapi.com/v1/api/the-loai/${slug}`,
  };
  // Fetch category details from API
  const fetchCategoryDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      setCategory(response.data.data.items);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(slug) {
        fetchCategoryDetails();
    }
  }, [slug]);

  return { category, loading, error };
};

export default useFetchCategoryDetails;