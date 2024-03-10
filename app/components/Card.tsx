import React from "react";
import Link from "next/link";

interface content {
  image: string;
  title: string;
  id: number;
}

const Card = ({ image, title, id }: content) => {
  return (
    <Link href={`/movie/${id}`}>
      <div
        title={title}
        className="bg-[#14181a] rounded-md w-[150px] md:w-[180px] lg:w-[210px] h-[250px] md:h-[280px] lg:h-[350px] flex flex-col justify-between items-center py-2 border border-gray-800"
      >
        <img
          className="w-[80%] h-[200px] lg:h-[260px] rounded-md my-3"
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt={image ? title : "No image available"}
        />
        <h1 className="text-[0.7rem] md:text-[0.8rem] text-center w-[80%] overflow-hidden">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default Card;
