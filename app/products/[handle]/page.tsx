import React from "react";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ handle?: string }>;
}) => {
  const { handle } = await params;
  return <div>Product: {handle}</div>;
};

export default SingleProductPage;
