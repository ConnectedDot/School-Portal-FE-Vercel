import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/axios-Instance";

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
  // Legacy field for backward compatibility
  status?: string;
}

/**
 * Get academic years
 * @param current Optional - set to true to only return current academic year
 */
export const useAcademicYears = (current?: boolean) => {
  return useQuery({
    queryKey: ["academic-years", current],
    queryFn: async () => {
      const params = current ? { current: "true" } : {};
      const response = await axiosInstance.get("/academic-years", { params });
      return response.data as AcademicYear[];
    },
  });
};

/**
 * Get academic years (backward compatibility alias)
 */
export const useGetAcademicYears = (current?: boolean) => {
  return useAcademicYears(current);
};

/**
 * Get current academic year
 */
export const useCurrentAcademicYear = () => {
  return useAcademicYears(true);
};
