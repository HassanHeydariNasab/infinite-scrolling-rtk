import { UIEventHandler, useEffect, useState } from "react";
import { Song, useGetSongsQuery } from "./songs.api";
import "./styles.css";

const LIMIT = 10;
export default function App() {
  const [songs, setSongs] = useState<(Song | undefined)[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const { data, isFetching, originalArgs } = useGetSongsQuery({
    offset,
    limit: LIMIT
  });

  useEffect(() => {
    if (data && originalArgs) {
      if (songs.length !== data.total) {
        setSongs(new Array(data.total));
      }
      setSongs((currentSongs) => {
        currentSongs.splice(
          originalArgs.offset,
          originalArgs.limit,
          ...data.list
        );
        return currentSongs;
      });
    }
  }, [data]);

  const onEndReached = () => {
    if (!isFetching && data && offset + LIMIT <= data.total) {
      setOffset((currentOffset) => (currentOffset += LIMIT));
    }
  };

  const onScroll: UIEventHandler<HTMLDivElement> = (event) => {
    const { scrollTop, scrollHeight, offsetHeight } = event.target as any;
    if (scrollTop + offsetHeight > scrollHeight * 0.8) {
      onEndReached();
    }
  };

  return (
    <div id={"container"} onScroll={onScroll}>
      {songs
        .filter((i) => {
          return i !== undefined;
        })
        .map((song) => (
          <div key={song!.id} className={"item"}>
            {song!.name}
          </div>
        ))}
      {isFetching && <div id={"loading"}>Loading...</div>}
    </div>
  );
}
