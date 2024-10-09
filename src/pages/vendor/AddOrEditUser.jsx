import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as validator from '../../utils/validators/UserValidator';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { ValidationError } from 'yup';
// import useAxiosFetchApi from '../../hooks/useFetch';
// import VendorSelect from '../../utils/VendorSelect';
import { useAuth } from '../../hooks/appHooks';

const ADD_USER_INFO_URL = "/vendors/add/user";
// const FETCH_VENDORS_URL = "/vendors";

const AddOrEditUser = ({ currentUser, onChangeData, isEdit = false, userRole }) => {
    const { t, i18n } = useTranslation();
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    // const [state] = useAxiosFetchApi(FETCH_VENDORS_URL.concat("?roleName=VENDOR"), {}, null);
    const [errors, setErrors] = useState({});
    const tUserInfo = t("vendorFormInfo");
    // const vendorList = state.data?.list;

    const handleAddOrEditUser = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        const userId = isEdit ? currentUser?.userId : null;
        const vendorId = isEdit ? currentUser?.vendor.vendorId : auth.vendor.vendorId;
        const formData = { ...data, role: "VENDOR_USER", userId, vendorId };
        try {
            await validator.validationSchema(tUserInfo, t("requiredMessage"))
                .validate(formData, { abortEarly: false });
            setErrors(null);

            const infoResponse = await axiosPrivate.post(ADD_USER_INFO_URL, formData, {
                headers: { 'Accept-Language': i18n.language }
            });

            onChangeData(infoResponse?.data.user);
            if (!isEdit) {
                e.target.querySelectorAll('input').forEach(input => {
                    input.value = '';
                });
            }
            toast.success(infoResponse?.data.message);
        } catch (error) {
            if (error instanceof ValidationError) {
                console.log(error instanceof ValidationError ? "validation error..." : error);
                let allErrors = {};
                error.inner.forEach((err) => {
                    allErrors[err.path] = err.message;
                });
                setErrors(allErrors);
            } else {
                if (!isEdit) {
                    e.target.querySelectorAll('input').forEach(input => { input.value = ""; });
                }
                toast.error(error.response?.data?.message || "An error occurred");
                console.error(error);
            }
        }
    };

    return (
        <div>
            <form className='w-full' onSubmit={handleAddOrEditUser} method='post'>
                <div className="flex justify-start">
                    <div className="md:w-[30%] my-4 mx-2">
                        <label htmlFor="email" className="text-lg">{tUserInfo.email?.label}</label>
                        <input type="email" name="email" id="email" defaultValue={currentUser?.email ?? ''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tUserInfo.email?.placeholder} />
                        {errors?.email && <div className='text-red-600'>{errors.email}</div>}
                    </div>
                    <div className="md:w-[30%] my-4 mx-2">
                        <label htmlFor="phone" className="text-lg">{tUserInfo.phone?.label}</label>
                        <input type="text" name="phone" id="phone" defaultValue={currentUser?.phone ?? ''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tUserInfo.phone?.placeholder} />
                        {errors?.phone && <div className='text-red-600'>{errors.phone}</div>}
                    </div>
                    {/* {userRole === "SUPERADMIN" && (
                        <div className="md:w-[30%] my-4 mx-2">
                        <label htmlFor="vendorId" className="text-lg">{tUserInfo.vendorId?.label}</label>
                        <VendorSelect currentData={currentUser}
                            vendorList={vendorList} tDataInfo={tUserInfo} />
                    </div>)} */}
                    <button type="submit" className="bg-primary-color text-white md:w-[30%] py-2 my-10 mx-5">{tUserInfo[isEdit ? "editBtn" : "addBtn"]}</button>
                </div>
            </form>
        </div>
    );
};

export default AddOrEditUser;