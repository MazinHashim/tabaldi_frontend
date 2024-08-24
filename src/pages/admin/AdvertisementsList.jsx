import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth } from '../../hooks/appHooks';
import { useState } from 'react';
import { GrDeploy } from "react-icons/gr";
import { FaPen, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AppLoading from '../../utils/AppLoading';
import EditModal from '../modals/EditModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import AddOrEditAdvertisement from '../admin/AddOrEditAdvertisement';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { baseURL } from '../../apis/axios';
import InformationModal from '../modals/InformationModal';
const ADVERTISEMENT_LIST_URL = "/advertisements";
const TOGGLE_PUBLISH_URL = "/advertisements/toggle/showing"
const ADVERTISEMENT_DELETE_URL = "/advertisements/delete"

const AdvertisementsList = () => {

    const {auth} = useAuth()
    const{t, i18n} = useTranslation();
    const axiosPrivate = useAxiosPrivate()
    const [editModal, setShowEditModal] = useState({advertisement: null, status: false});
    const [deleteModal, setShowDeleteModal] = useState({advertisementId: null, status: false});
    const [imagesModal, setShowImagesModal] = useState({advertisement: null, status: false});
    const [isLoading, setLoading] = useState(false);
    const sessionToken = auth.token;
    const [state,_, setChangeData] = useAxiosFetchApi(ADVERTISEMENT_LIST_URL, {}, sessionToken);
    const advertisementList = state.data?.list;
    // const { setAdvertisements } = useAdvertisementsData();

    // useEffect(()=>{
    //     setAdvertisements(state.data?.list)
    //     console.log(JSON.stringify(state.data?.list))
    // }, [state.data, setAdvertisements])

    async function toggleAdvertisementShowing(advertisementId){
        try{
            setLoading(true)
            const params = `/${advertisementId}`;
            const statusChangedResponse = await axiosPrivate.get(TOGGLE_PUBLISH_URL+params,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            setLoading(false)
            const otherAdvertisements=advertisementList.filter(ads=>ads.advertisementId!==advertisementId);
            const selectedAdvertisement=advertisementList.filter(ads=>ads.advertisementId===advertisementId);
            setChangeData([...otherAdvertisements, {...selectedAdvertisement[0],
                shown: statusChangedResponse?.data.published}])
            toast.success(statusChangedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }

    const handleOnAdvertisementDelete = async (advertisementId)=>{
        console.log("advertisementId"+advertisementId)
        try{
            setLoading(true)
            const advertisementDeletedResponse = await axiosPrivate.delete(ADVERTISEMENT_DELETE_URL+`/${advertisementId}`,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            setLoading(false)
            const otherAdvertisements=advertisementList.filter(ads=>ads.advertisementId!==advertisementId)
            setChangeData(otherAdvertisements)
            toast.success(advertisementDeletedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }

    function onSetChangedData(advertisement){
        const otherAdvertisements = advertisementList.filter(ads=>ads.advertisementId!==advertisement.advertisementId)
        setChangeData([...otherAdvertisements, advertisement])
    }

  return (
    <>
        <ToastContainer />
        <div className='flex flex-col w-full'>
            <div className="flex justify-between mb-10">
                <h2>Advertisements</h2>
                <button className="bg-secondary-color text-white"
                onClick={()=>setShowEditModal({advertisement: null, status: true})}
                >Add New Advertisement</button>
            </div>
            <div className="flex flex-col shadow-4 p-2 rounded-2xl">
                <div className="flex justify-between">
                    <input type="text" placeholder='Search' className='p-2 m-2 rounded-lg border'/>
                    <select className='p-2 m-2 rounded-lg border' name="status" id="status">
                        <option>Status</option>
                        <option value={true}>Visiable</option>
                        <option value={false}>Hidden</option>
                    </select>
                </div>
                <div className="overflow-x-scroll sm:-mx-3 lg:-mx-2">
                    <div className="inline-block min-w-full py-2">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead
                            className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                            <tr key={"head-1"}>
                            <th scope="col" className="whitespace-nowrap  p-4">Title</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Subtitle</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Created Date</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Expire Date</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Start Time</th>
                            <th scope="col" className="whitespace-nowrap  p-4">End Time</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Link</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Vendor</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Type</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Advertisement Images</th>
                            <th scope="col" className="whitespace-nowrap  p-4">Visibility</th>
                            <th scope="col" className="whitespace-nowrap  p-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.isLoading?<tr><td colSpan={9} className='p-10'>
                                <AppLoading/>
                                </td></tr>
                            : !state.data.list
                            ? <tr><td colSpan={9} className='p-10'>{state.data.message??state.error.message}</td></tr>
                            : advertisementList
                            .sort((a, b) => {
                                if (a.title < b.title) return -1;
                                if (a.title > b.title) return 1;
                                return 0
                            }).map((data)=>{
                                const advertisement=data;
                                const bgColor=advertisement.shown?"bg-green-200":"bg-red-200";
                                const txtColor=advertisement.shown?"text-green-600":"text-red-600";
                            return <tr key={advertisement.advertisementId}>
                                <td className="whitespace-nowrap p-4 font-medium capitalize">{advertisement.title}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.subtitle===""?"_":advertisement.subtitle??"_"}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.fcreatedDate}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.fexpireDate}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.fstartTime}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.fendTime}</td>
                                <td className="whitespace-nowrap p-4">
                                    {advertisement.url
                                    ? <a className='bg-gray-200 text-xs' target='_blank' href={advertisement.url} rel="noreferrer">Visit</a>
                                    : "_"}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.vendor?.fullName??"_"}</td>
                                <td className="whitespace-nowrap p-4">{advertisement.vendor==null?"External":"Internal"}</td>
                                <td className="whitespace-nowrap p-4">
                                    {/* <img className='w-[45%] rounded-lg' src={`${baseURL}/files/get/file/${advertisement.adsImage1}`} alt="ads1" /> */}
                                    <button 
                                    onClick={()=>setShowImagesModal({advertisement: advertisement, status: true})}
                                    className='bg-gray-200 text-xs'>Show Images</button>
                                </td>
                                <td className="whitespace-nowrap p-4">
                                    <span className={`px-1 shadow-2 rounded-md ${txtColor} ${bgColor}`}>
                                        {advertisement.shown?"Visiable":"Hidden"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 w-1/4">
                                    <button 
                                    onClick={()=>isLoading?null:toggleAdvertisementShowing(advertisement.advertisementId)}
                                    className={`${advertisement.shown&&"bg-green-200"} mx-1`}>
                                        <GrDeploy/>
                                    </button>
                                    <button 
                                    onClick={()=>setShowEditModal({advertisement: advertisement, status: true})}
                                    className='bg-success-200 mx-1'>
                                        <FaPen/>
                                    </button>
                                    <button 
                                    onClick={()=>setShowDeleteModal({advertisementId: advertisement.advertisementId, status: true})}
                                    className='bg-danger-200 mx-1'>
                                        <FaTrash/>
                                    </button>
                                </td>
                            </tr>
                            })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <EditModal showModal={editModal.status} setShowModal={setShowEditModal} target="Advertisement">
            <AddOrEditAdvertisement key={editModal.advertisement?.advertisementId}
            isEdit={editModal.advertisement!=null}
            setChangeData={onSetChangedData}
            currentAdvertisement={editModal.advertisement}/>
        </EditModal>
        <ConfirmationModal
            title={"Confirm advertisement Delete"}
            btnColor={"bg-danger"}
            message={"Are you sure for deleting this advertisement?"}
            onAction={()=>{handleOnAdvertisementDelete(deleteModal.advertisementId); setShowDeleteModal({...deleteModal, status: false})}}
            showModal={deleteModal.status}
            setShowModal={setShowDeleteModal}/>
        <InformationModal
        title={"Advertisement Images"}
        btnColor={"bg-info"}
        showModal={imagesModal.status}
        setShowModal={setShowImagesModal}>
            <div className='flex justify-between'>
                <img className='w-[45%] h-72 rounded-xl' src={`${baseURL}/files/get/file/${imagesModal.advertisement?.adsImage1}`} alt="ads1" />
                <img className='w-[45%] h-72 rounded-xl' src={`${baseURL}/files/get/file/${imagesModal.advertisement?.adsImage2}`} alt="ads2" />
                <img className='w-[45%] h-72 rounded-xl' src={`${baseURL}/files/get/file/${imagesModal.advertisement?.adsImage3}`} alt="ads3" />
            </div>
        </InformationModal>
    </>
  )
}

export default AdvertisementsList