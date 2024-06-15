import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: cabin,
    isLoading,
    error,
  } = useQuery({ queryKey: ["cabin"], queryFn: getCabins });

  return { cabin, isLoading, error };
}
