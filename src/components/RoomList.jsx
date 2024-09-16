import React from "react";
import useFetchRooms from "../hooks/useFetchRooms";
import RoomCard from "./card/RoomCard";
import SkeletonLoader from "../utils/SkeletonLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const RoomList = () => {
  const { rooms, loading, error, hasMore } = useFetchRooms("/sample.json");

  if (loading && rooms.length === 0) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={rooms?.length}
      hasMore={hasMore}
      loader={<SkeletonLoader />}
      endMessage={
        <p className="text-center text-gray-500">No more rooms to show.</p>
      }
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
    >
      {rooms?.map((room, index) => (
        <RoomCard key={index} room={room} isLoading={loading} />
      ))}
    </InfiniteScroll>
  );
};

export default RoomList;
