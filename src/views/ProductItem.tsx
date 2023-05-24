import React from "react";
import { JSX } from "react/jsx-runtime";

export default function ProductItem({ data }: any) {
  let listItem = data.results;
  let content: Array<
    React.ReactElement<any, string | React.JSXElementConstructor<any>>
  > = [];
  listItem.map(
    (value: {
      id: React.Key | null | undefined;
      poster_path: string | undefined;
      title:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
      overview:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    }) => {
      content.push(
        <a key={value.id} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={`https://www.themoviedb.org/t/p/w440_and_h660_face${value.poster_path}`}
              alt={`https://www.themoviedb.org/t/p/w440_and_h660_face${value.poster_path}`}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{value.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {value.overview}
          </p>
        </a>
      );
    }
  );
  return content ? <>{content}</> : <div>not found</div>;
}
