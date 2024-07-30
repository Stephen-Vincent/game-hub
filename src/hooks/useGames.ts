import { useEffect, useState } from "react";
import apiService from "../services/api-services";
import { CanceledError } from "axios";

interface Game {
    id: number;
    name: string;
  }
  
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    
    apiService.get<FetchGamesResponse>("/games", { signal: controller.signal})
    .then((res) => setGames(res.data.results))
    .catch((err) =>{ 
        if(err instanceof CanceledError) return;
        setError(err.message)
    })

    return () => controller.abort();
     // Ensure this effect runs only once by providing an empty dependency array

     
    }, [])
return { games, error};

}



export default useGames;