import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import Filter from "./Filter";

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const fetchMovies = (currentPage = 1, searchVal = "", genreFilter = "") => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWQ1ZTJkYWYxZTE1MjYwY2M4YmY0ZDQ0ZGUyYTg1MiIsInN1YiI6IjY0NmQ5OTQ2NTFlNmFiMDBlNWRkYmZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yj6TqSq2z0j4RIFfN6YpvfOKuUxixp8bh-iqATr72zk",
      },
    };

    const urlDiscovery = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&with_genres=${genreFilter}&sort_by=popularity.desc`;
    const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=en-US&page=${currentPage}'`;
    const url = searchVal ? urlSearch : urlDiscovery;

    return fetch(url, options).then((res) => res.json());
  };
  const {
    isLoading,
    error,
    data: movies,
    refetch,
  } = useQuery({
    queryKey: ["movies", currentPage, genreFilter],
    queryFn: () => fetchMovies(currentPage, searchVal, genreFilter),
    keepPreviousData: true,
  });

  const handleOnChange = (e: any): void => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  const handleOnKeyDown = (e: any): void => {
    if (e.key === "Enter") {
      refetch();
    }
  };

  const handleOnFilter = (genre: any): void => {
    setGenreFilter(genre);
  };

  if (isLoading) return <div>Loading . . .</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className="px-4 sm:px-0">
        <div className="mt-6 flex flex-row-reverse">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="button"
                onClick={() => {
                  refetch();
                }}
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="py-2 border-2 text-sm text-grey bg-white-900 rounded-md pl-10 focus:outline-none focus:bg-gray-300 focus:text-gray-900"
              placeholder="Search..."
              autoComplete="off"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              test-id="input-search"
            />
          </div>
        </div>
        <Filter genreFilter={genreFilter} handleOnFilter={handleOnFilter} />
        {/* here filter or search */}
      </div>
      <div className="mt-6 border-t border-gray-100">
        <div className="bg-white">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Movies
          </h2>
          <Pagination
            currentPage={movies?.page}
            limit={20}
            prevPage={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
            nextPage={() => setCurrentPage((state) => state + 1)}
            totalPost={movies.total_results}
          />
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <ProductItem data={movies} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
