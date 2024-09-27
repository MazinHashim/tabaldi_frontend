import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth } from '../../hooks/appHooks';
import React, { useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import EditModal from '../modals/EditModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import AddOrEditAdvertisement from '../admin/AddOrEditAdvertisement';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { baseURL } from '../../apis/axios';
import InformationModal from '../modals/InformationModal';
import { groupBy } from 'lodash';
import AvailableBanners from '../../utils/AvailableBanners';
import AdvertisementTable from './AdvertisementTable';
import AppLoading from '../../utils/AppLoading';

const ADVERTISEMENT_LIST_URL = "/advertisements";
const TOGGLE_PUBLISH_URL = "/advertisements/toggle/showing"
const ADVERTISEMENT_DELETE_URL = "/advertisements/delete"

const AdvertisementsList = () => {

    const {auth} = useAuth()
    const{t, i18n} = useTranslation();
    const tAdvertisementInfo = t("advertisementFormIfno")
    const axiosPrivate = useAxiosPrivate()
    const [editModal, setShowEditModal] = useState({advertisement: null, status: false});
    const [deleteModal, setShowDeleteModal] = useState({advertisementId: null, status: false});
    const [imagesModal, setShowImagesModal] = useState({advertisement: null, status: false});
    const [isLoading, setLoading] = useState(false);
    const sessionToken = auth.token;
    const [state,_, setChangeData] = useAxiosFetchApi(ADVERTISEMENT_LIST_URL, {}, sessionToken);
    const advertisementList = state.data?.advertisements;
    const availableBanners = state.data?.availableBanners;

    const groupedAdvertisements = useMemo(() => {
        if (!state.data?.advertisements) return {};
        const sorted = [...state.data.advertisements].sort((a, b) => a.priority - b.priority);
        return groupBy(sorted, 'priority');
    }, [state.data?.advertisements]);

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
            setChangeData({availableBanners, advertisements: [...otherAdvertisements, {...selectedAdvertisement[0],
                shown: statusChangedResponse?.data.published}]})
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
            const updatedAdvertisements = advertisementList.filter(ads => ads.advertisementId !== advertisementId);
            setChangeData({
                availableBanners,
                advertisements: updatedAdvertisements
            });
            toast.success(advertisementDeletedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }

    function onSetChangedData(advertisement){
        const otherAdvertisements = advertisementList.filter(ads => ads.advertisementId !== advertisement.advertisementId);
        const oldAdvertisement = advertisementList.find(ads => ads.advertisementId === advertisement.advertisementId);
        
        const updatedAvailableBanners = {
            ...availableBanners,
            [oldAdvertisement.vendor?.vendorType || "EXTERNAL_ADS"]
            : availableBanners[oldAdvertisement.vendor?.vendorType || "EXTERNAL_ADS"]
                .replace(oldAdvertisement.priority.toString(), advertisement.priority.toString())
        };
console.log(availableBanners[oldAdvertisement.vendor
            ? oldAdvertisement.vendor.vendorType
            : "EXTERNAL_ADS"], JSON.stringify(updatedAvailableBanners))
        setChangeData({
            availableBanners: updatedAvailableBanners,
            advertisements: [...otherAdvertisements, advertisement]
        });
    }

    return (
    <>
        {!editModal && <ToastContainer />}
        <div className='flex flex-col w-full'>
            <div className="flex justify-between mb-10">
                <h2>{tAdvertisementInfo["advertisements"]}</h2>
                <button className="bg-secondary-color text-white"
                onClick={()=>setShowEditModal({advertisement: null, status: true})}
                >{tAdvertisementInfo["addAdvertisementTitle"]}</button>
            </div>

            {state.isLoading&&<div>
                <AppLoading /></div>}
            {!state.data.advertisements&&<div>
            <p className='p-10'>{state.data?.message??state.error?.message}</p></div>}
            {state.data.availableBanners&&<AvailableBanners availableBanners={availableBanners} />}
            {state.data.advertisements&&<AdvertisementTable 
                groupedAdvertisements={groupedAdvertisements}
                isLoading={isLoading}
                toggleAdvertisementShowing={toggleAdvertisementShowing}
                setShowEditModal={setShowEditModal}
                setShowDeleteModal={setShowDeleteModal}
                setShowImagesModal={setShowImagesModal}
            />}
        </div>
        <EditModal showModal={editModal.status} setShowModal={setShowEditModal} target="Advertisement">
            <AddOrEditAdvertisement key={editModal.advertisement?.advertisementId}
            isEdit={editModal.advertisement!=null}
            onEdit={onSetChangedData}
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
        title={"Advertisement Image"}
        btnColor={"bg-info"}
        showModal={imagesModal.status}
        setShowModal={setShowImagesModal}>
            <div className='flex justify-between'>
                <img className='md:w-full h-72 rounded-xl' src={`${baseURL}/files/get/file/${imagesModal.advertisement?.adsImage1}`} alt="ads1" />
                {/* <img className='md:w-1/4 h-72 rounded-xl' src={`${baseURL}/files/get/file/${imagesModal.advertisement?.adsImage2}`} alt="ads2" />
                <img className='md:w-1/4 h-72 rounded-xl' src={`${baseURL}/files/get/file/${imagesModal.advertisement?.adsImage3}`} alt="ads3" /> */}
            </div>
        </InformationModal>
    </>
  )
}

export default AdvertisementsList