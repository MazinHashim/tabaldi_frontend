import React from 'react';
import { useTranslation } from 'react-i18next';

const AvailableBanners = ({ availableBanners }) => {
    const{t} = useTranslation();
    const tAdvertisementInfo = t("advertisementFormIfno")

    if (!availableBanners) return null;

    return (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">{tAdvertisementInfo["availableBanners"]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(availableBanners).map(([vendorType, banners]) => (
                    <div key={vendorType} className="bg-gray-100 rounded-md p-4">
                        <h4 className="font-medium mb-2 break-words">{vendorType}</h4>
                        <p className="text-sm text-gray-600 break-words">{banners}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableBanners;