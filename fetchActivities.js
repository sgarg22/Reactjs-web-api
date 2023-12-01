
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ( country) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: 'https://travel-info-api.p.rapidapi.com/country-activities',
        params: { country: 'India' },
        headers: {
            'X-RapidAPI-Key': '12d47554eemshd74c9cb686ff2e2p17e5e4jsncddb67d7b17f',
            'X-RapidAPI-Host': 'travel-info-api.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
