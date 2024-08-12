import { useEffect, useState } from "react";
import apiServices from "../services/api-services";
import { AxiosRequestConfig, CanceledError } from "axios";



interface FetchResponse <T>{
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true)
      apiServices.get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig})
      .then((res: { data: { results: any; }; }) => {
        setData(res.data.results)
        setLoading(false)
      })
      .catch((err) =>{ 
          if(err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false)
      })
  
      return () => controller.abort();
       // Ensure this effect runs only once by providing an empty dependency array
  
       
      },deps ? [...deps] : [])
  return { data, error, isLoading};
  
};

export default useData;