import { useEffect, useState } from "react";
import apiService from "../services/api-services";
import { CanceledError } from "axios";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
  }
  
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true)
    apiService.get<FetchGamesResponse>("/games", { signal: controller.signal})
    .then((res) => {
      setGames(res.data.results)
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
return { games, error, isLoading};

}



export default useGames;