import { useEffect, useState } from "react";
import { CarTypes } from "../types";
import Car from "../components/Card";

function Scroll() {
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function getData(limit: number, currentPage: number) {
    try {
      const data = await fetch(
        `http://localhost:3000/machines?limit=${limit}&page=${currentPage}`
      );
      const response = await data.json();
      setCars([...cars, ...response.results]);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (fetching) {
      getData(6, currentPage);
    }
  }, [fetching, currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  function scrollHandler() {
    const target = document.documentElement;
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  return (
    <>
      <h1 className="py-4 text-center text-4xl font-semibold bg-blue-700 text-white">
        Cars
      </h1>
      <div className="p-4 flex gap-4 flex-wrap justify-center">
        {cars && cars.map((el, index) => <Car data={el} key={index} />)}
      </div>
    </>
  );
}

export default Scroll;
