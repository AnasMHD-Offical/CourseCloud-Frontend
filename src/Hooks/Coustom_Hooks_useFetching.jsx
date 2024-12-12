import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUser_management = (fetch_Func) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetch_Func,
  });
};

export const useUser_Management_Mutation = (mutationFunc) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFunc,
    onSuccess: (data) => {
      const { success, message } = data;
      if (success) {
        toast.success(message);
        queryClient.invalidateQueries(["users"]);
        // Replace "users" with the relevant query key
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "An error occurred";
      console.error(error);
      toast.error(message);
    },
  });
};
