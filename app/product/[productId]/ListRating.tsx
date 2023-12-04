"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps {
  product: any;
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading text="Product Reviews" />
      <div>
        {product.reviews &&
          product.reviews.map((item: any) => (
            <div key={item.id} className="max-w[300px]">
              <div className="flex gap-2 items-center">
                <Avatar src={item.user.image} />
                <div className="font-semibold">{item.user.name}</div>
                <div className="font-light">
                  {moment(item.createdDate).fromNow()}
                </div>
              </div>
              <div className="mt-2">
                <Rating value={item.rating} readOnly />
                <div className="ml-2">{item.comment}</div>
              </div>
              <hr className="mt-4 mb-4 max-w-[300px]" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListRating;
