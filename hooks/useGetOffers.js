import useSWR from "swr";

function useGetOffers() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/Product/GetProductsOnOffer", fetcher);

  return { data, error };
}

export default useGetOffers;
