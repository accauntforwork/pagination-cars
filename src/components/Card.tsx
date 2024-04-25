import { CarTypes } from "../types";
import { FC } from "react";

interface dataType {
  data: CarTypes;
}

const Card: FC<dataType> = ({ data }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <img src={data.image} height={200} width={320} alt={data.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.title}!</h2>
        <p>Class: {data.class}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-blue-600 text-white">
            Start: {data.start_production}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
