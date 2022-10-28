import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { createClient } from "pexels";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
  // const { data } = useQuery(["cat"], () => {
  //   return Axios.get("");
  // });
  // const client = createClient(APIKEY);
  // client.photos.random().then((photo) => {
  //   console.log(photo);
  // });
  // console.log(client.photos.curated());

  const queryClient = new QueryClient();

  // console.log(data);

  return (
    <QueryClientProvider client={queryClient}>
      <Gallery />
    </QueryClientProvider>
  );
}

function Gallery() {
  const APIKEY = "563492ad6f917000010000017c6e638d33ec442cbfb22598187607f2";
  const client = createClient(APIKEY);

  // client.photos.curated({ page: 1 }).then((imgs) => {
  //   console.log(imgs);
  // });

  const { data, isLoading } = useQuery(["photos"], () => {
    return client.photos
      .curated({ page: 2 })
      .then((res) => res)
      .then((data) => data.photos);
  });

  if (isLoading)
    return (
      <h1 className="text-center font-bold text-red-700 text-2xl">
        Loading...
      </h1>
    );

  // console.log(data[0].src.original);

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((item, i) => (
        <div key={i} className="w-full h-full truncate">
          <LazyLoadImage
            className="h-[400px] w-[400px] object-cover object-center hover:scale-125 transition-all duration-500"
            src={item.src.original}
            alt="img"
            effect="blur"
          />
        </div>
      ))}
    </div>
  );
}

export default App;
