import { useQuery } from "react-query";

const useAddress = (type, parentId) => {
  const fetchAddress = async () => {
    if (type === "divisions") {
      const res = await fetch(`/api/locations/${type}`);
      if (!res.ok) {
        throw new Error("Fetching divisions failed!");
      }
      const result = await res.json();
      const options = result.data.map((item) => ({
        value: item.division_id,
        label: item.name,
      }));
      return options;
    }
    if (type === "districts") {
      const res = await fetch(`/api/locations/${type}?division_id=${parentId}`);
      if (!res.ok) {
        throw new Error("Fetching districts failed!");
      }
      const result = await res.json();
      const options = result.data.map((item) => ({
        value: item.district_id,
        label: item.name,
      }));
      return options;
    }
    if (type === "upazilas") {
      const res = await fetch(`/api/locations/${type}?district_id=${parentId}`);
      if (!res.ok) {
        throw new Error("Fetching upazilas failed!");
      }
      const result = await res.json();
      const options = result.data.map((item) => ({
        value: item.upazila_id,
        label: item.name,
      }));
      return options;
    }
    if (type === "unions") {
      const res = await fetch(`/api/locations/${type}?upazila_id=${parentId}`);
      if (!res.ok) {
        throw new Error("Fetching unions failed!");
      }
      const result = await res.json();
      const options = result.data.map((item) => ({
        value: item.union_id,
        label: item.name,
      }));
      return options;
    }
  };

  const { isLoading, isError, data, error } = useQuery(
    [type, parentId],
    fetchAddress,
    {
      enabled: parentId ? true : false,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, isError, data, error };
};

export default useAddress;
