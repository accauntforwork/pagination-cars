import { ChangeEvent, useEffect, useState } from "react";
import Car from "../components/Card";
import { CarTypes } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

function Click() {
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [limit, setLimit] = useState<number>(
    localStorage.getItem("limit")
      ? JSON.parse(localStorage.getItem("limit")!)
      : 8
  );
  const [currentPage, setCurrentPage] = useState<number>(
    localStorage.getItem("page") ? JSON.parse(localStorage.getItem("page")!) : 1
  );
  const [total, setTotal] = useState<number>(1);
  const navigate = useNavigate();
  const params = useParams();

  async function getData(limit: number, currentPage: number) {
    console.log(currentPage);
    try {
      const data = await fetch(
        `http://localhost:3000/machines?limit=${limit}&page=${params.id}`
      );
      const response = await data.json();
      setCars(response.results);
      setTotal(response.total);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData(limit, currentPage);
  }, []);

  function handleChange(e: ChangeEvent<unknown>, count: number) {
    console.log(e);
    setCurrentPage(count);
    localStorage.setItem("page", JSON.stringify(count));
  }

  useEffect(() => {
    getData(limit, currentPage);
  }, [currentPage, limit]);

  return (
    <>
      <h1 className="py-4 text-center text-4xl font-semibold bg-blue-700 text-white">
        Cars
      </h1>
      <select
        defaultValue={limit}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setLimit(Number(e.target?.value));
          localStorage.setItem("limit", JSON.stringify(e.target?.value));
        }}
        name="select"
        className="select w-full max-w-xs my-4 focus:outline-none border border-red-900 ml-6"
        id="select"
      >
        <option selected value="8">
          8
        </option>
        <option value="16">16</option>
        <option value="24">24</option>
        <option value="32">32</option>
      </select>
      <div className="p-4 flex gap-4 flex-wrap justify-center">
        {cars && cars.map((el, index) => <Car data={el} key={index} />)}
      </div>
      <div className="flex flex-col items-center">
        <hr className="w-96 h-1 mx-auto my-4 bg-blue-800 border-0 rounded"></hr>
        <Pagination
          defaultPage={currentPage}
          onChange={(event: ChangeEvent<unknown>, page: number) => {
            handleChange(event, page);
            navigate(`/${page}`);
          }}
          count={Math.trunc(total / limit)}
          variant="outlined"
          color="secondary"
          className="mb-4"
        />
      </div>
    </>
  );
}

export default Click;
