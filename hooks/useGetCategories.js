import useSWR from "swr";

function useGetCategories() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/Category/GetAllCategories", fetcher);

  return { data, error };
}

export default useGetCategories;
