import React, { useEffect, useState } from 'react';
import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth } from '../../hooks/appHooks';
import { FaPen, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AppLoading from '../../utils/AppLoading';
import EditModal from '../modals/EditModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import AddOrEditUser from './AddOrEditUser';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { useLocation } from 'react-router-dom';

const FETCH_USERS_URL = "/vendors/{id}/users";
const USER_DELETE_URL = "/vendors/delete/user";

const UsersList = ({ routeRole }) => {
    const { auth, setAuth } = useAuth();
    const { t, i18n } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const tUserInfo = t("vendorFormInfo");
    const vendor = location?.state?.vendor;
    const [editModal, setShowEditModal] = useState({ user: null, status: false });
    const [deleteModal, setShowDeleteModal] = useState({ userId: null, status: false });
    const [searchQuery, setSearchQuery] = useState('');
    const sessionToken = auth.token;
    const [state, setUrl, setChangeData] = useAxiosFetchApi(null, {}, sessionToken);

    useEffect(() => {
        const vendorUsersUrl = FETCH_USERS_URL.replace("{id}", `${vendor?.vendorId ?? auth.vendor?.vendorId}`);
        setUrl(vendorUsersUrl);
    }, [auth.vendor?.vendorId, setUrl, vendor]);

    useEffect(() => {
        if (vendor) {
            setAuth((prev)=>({ ...prev, vendor }));
        }
    }, [vendor, setAuth]);

    const userList = state.data?.list;

    const handleOnUserDelete = async (userId) => {
        try {
            const userDeletedResponse = await axiosPrivate.delete(USER_DELETE_URL + `/${userId}`,
                { headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json' } }
            );
            const otherUsers = userList.filter(user => user.userId !== userId);
            setChangeData({ list: otherUsers });
            toast.success(userDeletedResponse?.data.message);
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    function onSetChangedData(user) {
        const otherUsers = userList?.filter(u => u.userId !== user.userId);
        setChangeData({ list: [...otherUsers||{}, user] });
    }

    const queryUsers = userList?.filter((user) =>
        Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <>
            <ToastContainer />
            <div className='flex flex-col w-full'>
                <div className="flex justify-between mb-10">
                    <h2>{tUserInfo.users}</h2>
                    <button className="bg-secondary-color text-white"
                        onClick={() => setShowEditModal({ user: null, status: true })}
                    >{tUserInfo.addNewBtn}</button>
                </div>
                <div className="flex flex-col shadow-4 p-2 rounded-2xl">
                    <div className="flex justify-between">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text" placeholder={t("search")} className='p-2 m-2 rounded-lg border' />
                    </div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 px-6">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light">
                                    <thead className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                                        <tr>
                                            <th scope="col" className="py-4">{tUserInfo.email?.label.replace("*","")}</th>
                                            <th scope="col" className="py-4">{tUserInfo.phone?.label.replace("*","")}</th>
                                            {routeRole === "SUPERADMIN" && <th scope="col" className="py-4">{tUserInfo.vendor}</th>}
                                            <th scope="col" className="py-1">{t("action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.isLoading ? <tr><td colSpan={routeRole === "SUPERADMIN" ? 4 : 3} className='p-10'>
                                            <AppLoading />
                                        </td></tr>
                                            : !userList
                                                ? <tr><td colSpan={routeRole === "SUPERADMIN" ? 4 : 3} className='p-10'>{state.data?.message ?? state.error?.message}</td></tr>
                                                : queryUsers?.length === 0
                                                    ? <tr><td colSpan={routeRole === "SUPERADMIN" ? 4 : 3} className='p-10'>{tUserInfo.noUsers}</td></tr>
                                                    : queryUsers.map((user) => (
                                                        <tr key={user.userId}>
                                                            <td className="whitespace-nowrap py-4 font-medium">{user.email}</td>
                                                            <td className="whitespace-nowrap py-4">{user.phone}</td>
                                                            {routeRole === "SUPERADMIN" && <td className="whitespace-nowrap py-4">{user?.vendor.fullName}</td>}
                                                            <td className="whitespace-nowrap py-4 w-1/4">
                                                                <button
                                                                    onClick={() => setShowEditModal({ user, status: true })}
                                                                    className='bg-success-200 mx-1'>
                                                                    <FaPen />
                                                                </button>
                                                                <button
                                                                    onClick={() => setShowDeleteModal({ userId: user.userId, status: true })}
                                                                    className='bg-danger-200 mx-1'>
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditModal showModal={editModal.status} setShowModal={setShowEditModal} target={tUserInfo[editModal.user != null ? "editUserTitle" : "addUserTitle"]}>
                <AddOrEditUser
                    key={editModal.user?.userId}
                    isEdit={editModal.user != null}
                    userRole={routeRole}
                    onChangeData={onSetChangedData}
                    currentUser={editModal.user} />
            </EditModal>
            <ConfirmationModal
                title={"Confirm User Delete"}
                btnColor={"bg-danger"}
                message={"Are you sure you want to delete this user?"}
                onAction={() => { handleOnUserDelete(deleteModal.userId); setShowDeleteModal({ ...deleteModal, status: false }) }}
                showModal={deleteModal.status}
                setShowModal={setShowDeleteModal} />
        </>
    );
};

export default UsersList;