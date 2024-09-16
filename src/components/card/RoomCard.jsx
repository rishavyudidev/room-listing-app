import React, { useEffect, Suspense, useRef, useState } from "react";
import SkeletonLoader from "../../utils/SkeletonLoader";
const VariantCard = React.lazy(() => import("./VariantCard"));

const RoomCard = React.memo(({ room, isLoading }) => {
  const videoRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [showMoreVariants, setShowMoreVariants] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              setIsVideoVisible(true);
              videoRef.current.play().catch((error) => {
                console.warn("Video play failed:", error);
              });
            } else {
              setIsVideoVisible(false);
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const defaultVariantsToShow = 3;
  const hasMoreVariants = room?.variants.length > defaultVariantsToShow;
  const variantsToShow = showMoreVariants
    ? room.variants
    : room.variants.slice(0, defaultVariantsToShow);

  const handleToggleVariants = () => {
    setShowMoreVariants(!showMoreVariants);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      {room?.properties?.video_url ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={room?.properties?.video_url?.med}
            className="w-full h-64 object-cover"
            preload="none"
            muted
          />
          {!isVideoVisible && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
              Loading...
            </div>
          )}
        </div>
      ) : room?.properties?.room_images[0]?.image_urls.length > 0 ? (
        <img
          // src={room?.properties?.room_images[0]?.image_urls[0]}
          alt={room.name}
          className="w-full h-64 object-cover"
          loading="lazy"
          srcSet={room?.properties?.room_images[0]?.image_urls
            .map((url, index) => `${url} ${480 * (index + 1)}w`)
            .join(", ")}
          sizes="(max-width: 600px) 480px,
         (max-width: 960px) 800px,
         1200px"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          No Media Available
        </div>
      )}
      <h2 className="text-xl font-semibold mt-2">
        {" "}
        {room?.name.length > 30
          ? `${room?.name.substring(0, 27)}...`
          : room?.name}
      </h2>
      <p className="text-gray-600">{room?.properties?.bed_type}</p>
      <p className="text-gray-600">
        Adutl {room?.properties?.room_capacity?.max_adult} Child{" "}
        {room?.properties?.room_capacity?.max_adult_with_children}
      </p>
      <p className="text-green-600 font-bold">{room.price}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 ${
            showMoreVariants ? "h-64 overflow-y-auto" : ""
          }`}
        >
          <Suspense fallback={<div>Loading Variants...</div>}>
            {variantsToShow.map((variant, index) => (
              <VariantCard key={index} variant={variant} index={index} />
            ))}
          </Suspense>
        </div>
        {hasMoreVariants && (
          <button
            onClick={handleToggleVariants}
            className="mt-4 text-blue-500 hover:underline"
          >
            {showMoreVariants ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
});

RoomCard.displayName = "RoomCard";

export default RoomCard;
