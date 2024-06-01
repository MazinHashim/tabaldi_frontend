import { useEffect, useReducer, useState } from "react";
import useAxiosPrivate from "../apis/useAxiosPrivate";
import { useTranslation } from "react-i18next";

function dataFetchReducer (state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload
      };
    default:
      throw new Error();
  }
};

const useAxiosFetchApi = (initialUrl, initialData, authToken) => {
  const [url, setUrl] = useState(initialUrl);
  const [changeData, setChangeData] = useState(null);
  const axiosPrivate = useAxiosPrivate()
  const{ i18n } = useTranslation();

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if(!url){
        dispatch({ type: 'FETCH_SUCCESS' });
        return;
      }
      dispatch({ type: 'FETCH_INIT' });
      const headers = {
        'Accept-Language': i18n.language,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      };
      try {
        const result = await axiosPrivate.get(url, { headers });
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: error.response.data });
        }
      }
    };

    fetchData();

    return () => { didCancel = true };

  }, [url, authToken, axiosPrivate, i18n.language]);

  useEffect(()=>{

    let didCancel = false;

    if(!didCancel && changeData){
      console.log("changeData", changeData)
      dispatch({ type: 'FETCH_SUCCESS', payload: {...state, list: changeData} })
      return;
    }

    return () => { didCancel = true }

  }, [changeData])

  return [state, setUrl, setChangeData];
};

export default useAxiosFetchApi;