import { useTranslation } from 'react-i18next';
import useAxiosPrivate from './useAxiosPrivate';

const FILES_DATA_URL = "/files/get/all/data";

const useFetchFileData = () => {
  const{i18n} = useTranslation();
  const axiosPrivate = useAxiosPrivate()

    const files = async (body) => {
      JSON.stringify(body)
        const response = await axiosPrivate.post(`${FILES_DATA_URL}`, body,
      { 'Accept-Language': i18n.language, 'Content-Type': 'application/json' });
        return response.data?.filesData
    }
  return files;
}

export default useFetchFileData