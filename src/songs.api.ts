import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Result<T> {
  total: number;
  list: T[];
}

export interface Song {
  id: string;
  name: string;
}

export const songsApi = createApi({
  reducerPath: "songsApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getSongs: builder.query<Result<Song>, { offset: number; limit: number }>({
      queryFn: ({ offset, limit }) => {
        let list: Song[] = [];
        for (let i = offset; i < offset + limit; i++) {
          list.push({ id: i.toString(), name: `Song ${i}` });
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                total: 100,
                list
              } as Result<Song>
            });
          }, 1000);
        });
      }
    })
  })
});

export const { useGetSongsQuery } = songsApi;
