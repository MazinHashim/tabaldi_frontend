import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth } from '../../hooks/appHooks';
import { useState } from 'react';
import { GrDeploy } from "react-icons/gr";
import { FaPen, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../apis/axios';
import { useTranslation } from 'react-i18next';
import AppLoading from '../../utils/AppLoading';
import EditModal from '../modals/EditModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import AddOrEditCategory from './AddOrEditCategory';
const CATEGORY_LIST_URL = "/vendors/{id}/categories";
const TOGGLE_PUBLISH_URL = "/categories/toggle/publish"
const CATEGORY_DELETE_URL = "/categories/delete"

const CategoriesList = () => {

    const {auth} = useAuth()
    const{t, i18n} = useTranslation();
    const [editModal, setShowEditModal] = useState({category: null, status: false});
    const [deleteModal, setShowDeleteModal] = useState({categoryId: null, status: false});
    const [isLoading, setLoading] = useState(false);
    const vendorCategoriesUrl = CATEGORY_LIST_URL.replace("{id}", `${auth.vendorId}`);
    const sessionToken = auth.token;
    const [state,_, setChangeData] = useAxiosFetchApi(vendorCategoriesUrl, {}, sessionToken);
    const categoryList = state.data?.list;
    // const { setCategories } = useCategoriesData();

    // useEffect(()=>{
    //     setCategories(state.data?.list)
    //     console.log(JSON.stringify(state.data?.list))
    // }, [state.data, setCategories])

    async function toggleCategoryPublishing(categoryId){
        try{
            setLoading(true)
            const params = `/${categoryId}`;
            const statusChangedResponse = await axios.get(TOGGLE_PUBLISH_URL+params,
                {headers: { 'Accept-Language': i18n.language,
                    'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`}}
            );
            setLoading(false)
            const otherCategories=categoryList.filter(cate=>cate.category.categoryId!==categoryId);
            const selectedCategory=categoryList.filter(cate=>cate.category.categoryId===categoryId);
            setChangeData([...otherCategories, {...selectedCategory[0],
                category: {...selectedCategory[0].category,
                published: statusChangedResponse?.data.published}}])
            // toast.success(statusChangedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }

    const handleOnCategoryDelete = async (categoryId)=>{
        console.log("categoryId"+categoryId)
        try{
            setLoading(true)
            const categoryDeletedResponse = await axios.delete(CATEGORY_DELETE_URL+`/${categoryId}`,
                {headers: { 'Accept-Language': i18n.language,
                    'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`}}
            );
            setLoading(false)
            const otherCategories=categoryList.filter(cate=>cate.category.categoryId!==categoryId)
            setChangeData(otherCategories)
            toast.success(categoryDeletedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }

    function onSetChangedData(category, wasEdit){
        const otherCategories = categoryList.filter(cate=>cate.category.categoryId!==category.categoryId)
        if(wasEdit){
            const selected = categoryList.filter(cate=>cate.category.categoryId===category.categoryId)
            setChangeData([...otherCategories, {...selected[0], category}])
        } else {
            setChangeData([...otherCategories, {numberOfProducts:0, category}])
        }
    }

  return (
    <>
        <ToastContainer />
        <div className='flex flex-col w-full'>
            <div className="flex justify-between mb-10">
                <h2>Categories</h2>
                <button className="bg-secondary-color text-white"
                onClick={()=>setShowEditModal({category: null, status: true})}
                >Add New Category</button>
            </div>
            <div className="flex flex-col shadow-4 p-2 rounded-2xl">
                <div className="flex justify-between">
                    <input type="text" placeholder='Search' className='p-2 m-2 rounded-lg border'/>
                    <select className='p-2 m-2 rounded-lg border' name="status" id="status">
                        <option>Status</option>
                        <option value={true}>Published</option>
                        <option value={false}>Unpublished</option>
                    </select>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 px-6">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead
                            className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                            <tr key={"head-1"}>
                            <th scope="col" className="py-4">Name</th>
                            <th scope="col" className="py-4">Products</th>
                            <th scope="col" className="py-4">Status</th>
                            <th scope="col" className="py-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.isLoading?<tr><td colSpan={7} className='p-10'>
                                <AppLoading/>
                                </td></tr>
                            : !state.data.list
                            ? <tr><td colSpan={7} className='p-10'>{state.data.message??state.error.message}</td></tr>
                            : categoryList
                            .sort((a, b) => {
                                if (a.category.name < b.category.name) return -1;
                                if (a.category.name > b.category.name) return 1;
                                return 0
                            }).map((data)=>{
                                const category=data.category;
                                const bgColor=category.published?"bg-green-200":"bg-red-200";
                                const txtColor=category.published?"text-green-600":"text-red-600";
                            return <tr key={category.categoryId}>
                                <td className="whitespace-nowrap py-4 font-medium capitalize">{category.name}</td>
                                <td className="whitespace-nowrap py-4">{data.numberOfProducts}</td>
                                <td className="whitespace-nowrap py-4">
                                        <span className={`px-1 shadow-2 rounded-md ${txtColor} ${bgColor}`}>
                                            {category.published?"Published":"Unpublished"}
                                        </span>
                                    </td>
                                <td className="whitespace-nowrap py-4 w-1/4">
                                    <button 
                                    onClick={()=>isLoading?null:toggleCategoryPublishing(category.categoryId)}
                                    className={`${category.published&&"bg-green-200"} mx-1`}>
                                        <GrDeploy/>
                                    </button>
                                    <button 
                                    onClick={()=>setShowEditModal({category, status: true})}
                                    className='bg-success-200 mx-1'>
                                        <FaPen/>
                                    </button>
                                    <button 
                                    onClick={()=>setShowDeleteModal({categoryId: category.categoryId, status: true})}
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
        <EditModal showModal={editModal.status} setShowModal={setShowEditModal} target="Category">
            <AddOrEditCategory key={editModal.category?.categoryId}
            isEdit={editModal.category!=null}
            setChangeData={onSetChangedData}
            currentCategory={editModal.category}/>
        </EditModal>
        <ConfirmationModal
            title={"Confirm Category Delete"}
            btnColor={"bg-danger"}
            message={"Are you sure for deleting this category?"}
            onAction={()=>{handleOnCategoryDelete(deleteModal.categoryId); setShowDeleteModal({...deleteModal, status: false})}}
            showModal={deleteModal.status}
            setShowModal={setShowDeleteModal}/>
    </>
  )
}

export default CategoriesList