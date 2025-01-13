import { useCallback } from "react";

const useFetchConcurrentRequests = (apiCalls) => {
  return useCallback(async () => {
    try {
      await Promise.all(apiCalls.map((apiCall) => apiCall()));
    } catch (error) {
      console.error('Error while fetching concurrent requests data:', error);
    }
  }, [apiCalls])
}

export default useFetchConcurrentRequests;