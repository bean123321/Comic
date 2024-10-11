import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const options = {
    method: "GET",
    url: "https://otruyenapi.com/v1/api/the-loai",
  };
  // Fetch categories from API
  const fetchCategories = async () => {
    setCategoriesLoading(true);

    try {
      const response = await axios.request(options);
      setCategories(response.data.data.items);
    } catch (error) {
        setCategoriesError(error);
      console.error(error);
    } finally {
        setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, categoriesLoading, categoriesError };
};

export default useFetchCategories;