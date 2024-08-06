import { useEffect, useState } from "react";
import apiServices from "../services/api-services";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true)
      apiServices.get<FetchGenresResponse>("/genres", { signal: controller.signal})
      .then((res: { data: { results: any; }; }) => {
        setGenres(res.data.results)
        setLoading(false)
      })
      .catch((err) =>{ 
          if(err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false)
      })
  
      return () => controller.abort();
       // Ensure this effect runs only once by providing an empty dependency array
  
       
      }, [])
  return { genres, error, isLoading};
  
};

export default useGenres;