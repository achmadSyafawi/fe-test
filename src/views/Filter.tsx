import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";

export default function Filter({ handleOnFilter }: any) {
  const fetchGenreMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWQ1ZTJkYWYxZTE1MjYwY2M4YmY0ZDQ0ZGUyYTg1MiIsInN1YiI6IjY0NmQ5OTQ2NTFlNmFiMDBlNWRkYmZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yj6TqSq2z0j4RIFfN6YpvfOKuUxixp8bh-iqATr72zk",
      },
    };
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

    return fetch(url, options).then((res) => res.json());
  };

  const {
    isLoading,
    error,
    data: genre,
    refetch,
  } = useQuery({
    queryKey: ["genre"],
    queryFn: () => fetchGenreMovies(),
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading. . .</div>;
  if (error) return <div>{`Error`}</div>;

  return (
    <Popover className="relative">
      <div className="flex space-x-8">
        <Popover.Button className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
          <span>Genre</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4 flex flex-wrap">
              {genre ? (
                genre.genres.map((item: any) => (
                  <div
                    key={item.id}
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div>
                      <a
                        data-id={item.id}
                        className="font-semibold text-gray-900"
                        onClick={(event) => {
                          event.preventDefault();
                          let dataset =
                            event.currentTarget.getAttribute("data-id") || "";
                          handleOnFilter(dataset);
                        }}
                      >
                        {item.name}
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div>not found</div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
