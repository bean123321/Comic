import { useState, useEffect } from "react";
import axios from "axios";

const useFetchReadComics = (chapterUrl) => {
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API request configuration
  const options = {
    method: "GET",
    url: chapterUrl,
  };

  const fetchChapterImages = async () => {
    try {
      const response = await axios.request(options);
      const { domain_cdn, item } = response.data.data;
      const images = item.chapter_image.map((image) => ({
        uri: `${domain_cdn}/${item.chapter_path}/${image.image_file}`,
      }));
      setChapterImages(images);
    } catch (error) {
      setError("Failed to load chapter images.");
      console.error("Error fetching chapter images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterImages();
  }, []);

  return { chapterImages, loading, error };
};

export default useFetchReadComics;
