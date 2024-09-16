import React from "react";

const VariantCard = ({ variant, index }) => {
  return (
    <div className="border p-2 rounded shadow-sm bg-gray-50">
      <h4 className="text-md font-semibold">{`Variant ${index + 1}`}</h4>
      <p className="text-sm text-gray-500">
        Price: €{variant?.total_price?.total_price}
      </p>
    </div>
  );
};

export default VariantCard;
