import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchapi } from './fetchApi';



export const useFetch= (endPoint)=>{
    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);

    useEffect(()=>{
        const fetchData= async ()=>{
            try {
                setLoading(true);
                const res= await fetchapi.get(endPoint);
                setData(res.data.data);
            } catch (error) {
                setError(error);
                
            }
            setLoading(false)
            

        }
        fetchData();
        
        
    },[endPoint])
    return {data , loading , error};

    

}