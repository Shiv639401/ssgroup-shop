import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

const DealsPage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "under-499") {
      dispatch(fetchProducts({ maxPrice: 499 }));
    }

    if (type === "flat-30") {
      dispatch(fetchProducts({ discount: 30 }));
    }

  }, [type, dispatch]);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">
        Deals: {type}
      </h1>
    </div>
  );
};

export default DealsPage;