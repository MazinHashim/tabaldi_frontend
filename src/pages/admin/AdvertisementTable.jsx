import React from 'react';
import { GrDeploy } from "react-icons/gr";
import { FaPen, FaTrash } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const AdvertisementTable = ({ 
    groupedAdvertisements, 
    isLoading, 
    toggleAdvertisementShowing, 
    setShowEditModal, 
    setShowDeleteModal, 
    setShowImagesModal
}) => {
    const{t} = useTranslation();
    const tAdvertisementInfo = t("advertisementFormIfno")
    return (
        <div className="flex flex-col shadow-4 p-2 rounded-2xl">
            <div className="flex justify-between">
                <input type="text" placeholder={tAdvertisementInfo.searchTxt} className='p-2 m-2 rounded-lg border'/>
                <select className='p-2 m-2 rounded-lg border' name="status" id="status">
                    <option>{tAdvertisementInfo.statusTxt}</option>
                    <option value={true}>{tAdvertisementInfo["visiable"]}</option>
                    <option value={false}>{tAdvertisementInfo["hidden"]}</option>
                </select>
            </div>
            <div className="overflow-x-scroll sm:-mx-3 lg:-mx-2">
                <div className="inline-block min-w-full py-2">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                            <thead className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                                <tr key={"head-1"}>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.priority.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.title.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.arTitle.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.subtitle.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.arSubtitle.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.createDate.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.expireDate.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.startTime.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.endTime.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.url.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.vendorId.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.type}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.adsImage1.label.replace("*","")}</th>
                                <th scope="col" className="whitespace-nowrap  p-4">{tAdvertisementInfo.visibility}</th>
                                <th scope="col" className="whitespace-nowrap  p-1">{t("action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(groupedAdvertisements).map(([priority, ads]) => (
                                    <React.Fragment key={priority}>
                                        <tr className="bg-green-100">
                                            <td colSpan="4" className="py-2 px-4 font-semibold">
                                                {tAdvertisementInfo['adsLabel']}: {priority}
                                            </td>
                                        </tr>
                                        {ads.sort((a, b) => {
                                            if (new Date(a.expireDate) > new Date(b.expireDate)) return -1;
                                            if (new Date(a.expireDate) < new Date(b.expireDate)) return 1;
                                            return 0;
                                        }).map((advertisement) => {
                                            // const isWithinDateRange = (new Date(advertisement.createdDate) <= new Date() && new Date(advertisement.expireDate) >= new Date());
                                            const bgColor = advertisement.visibleNow ? "bg-green-200" : "bg-red-200";
                                            const txtColor = advertisement.visibleNow ? "text-green-600" : "text-red-600";

                                            const finalBgColor = advertisement.visibleNow ? "bg-white" : "bg-red-100";

                                            return (
                                                <tr key={advertisement.advertisementId} className={finalBgColor}>
                                                    <td className="whitespace-nowrap p-4">{advertisement.priority}</td>
                                                    <td className="whitespace-nowrap p-4 font-medium capitalize">{advertisement.title}</td>
                                                    <td className="whitespace-nowrap p-4 font-medium capitalize">{advertisement.arTitle}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.subtitle === "" ? "_" : advertisement.subtitle ?? "_"}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.arSubtitle === "" ? "_" : advertisement.arSubtitle ?? "_"}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.fcreatedDate}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.fexpireDate}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.fstartTime}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.fendTime}</td>
                                                    <td className="whitespace-nowrap p-4">
                                                        {advertisement.url
                                                        ? <a className='bg-gray-200 text-xs' target='_blank' href={advertisement.url} rel="noreferrer">Visit</a>
                                                        : "_"}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.vendor?.fullName ?? "_"}</td>
                                                    <td className="whitespace-nowrap p-4">{advertisement.vendor == null ? "External" : "Internal"}</td>
                                                    <td className="whitespace-nowrap p-4">
                                                        <button 
                                                        onClick={() => setShowImagesModal({ advertisement: advertisement, status: true })}
                                                        className='bg-gray-200 text-xs'>Show Image</button>
                                                    </td>
                                                    <td className="whitespace-nowrap p-4">
                                                        <span className={`px-1 shadow-2 rounded-md ${!advertisement.shown ? "text-red-600" : txtColor} ${!advertisement.shown ? "bg-red-200" : bgColor}`}>
                                                            {advertisement.shown && advertisement.visibleNow ? "Visiable" : "Hidden"}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 w-1/4">
                                                        <button 
                                                        onClick={() => isLoading ? null : toggleAdvertisementShowing(advertisement.advertisementId)}
                                                        className={`${advertisement.shown && "bg-green-200"} mx-1`}>
                                                            <GrDeploy />
                                                        </button>
                                                        <button 
                                                        onClick={() => setShowEditModal({ advertisement: advertisement, status: true })}
                                                        className='bg-success-200 mx-1'>
                                                            <FaPen />
                                                        </button>
                                                        <button 
                                                        onClick={() => setShowDeleteModal({ advertisementId: advertisement.advertisementId, status: true })}
                                                        className='bg-danger-200 mx-1'>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementTable;