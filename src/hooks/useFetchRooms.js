import { useState, useEffect } from "react";
import { fetchRooms } from "../utils/api";

const useFetchRooms = (url) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRooms(url);
        const roomDetailsArray = data?.rooms_by_serial_no[0]?.rooms || [];

        setRooms((prevRooms) => [...prevRooms, ...roomDetailsArray]);
      } catch (error) {
        setError(error.message);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [url]);

  return { rooms, loading, error, hasMore };
};

export default useFetchRooms;
