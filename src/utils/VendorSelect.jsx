import { useState } from 'react';

const VendorSelect = ({ currentData, vendorList, tDataInfo }) => {
  const [searchTerm, setSearchTerm] = useState(currentData?.vendor?.fullName); // For input search
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
  const [selectedVendor, setSelectedVendor] = useState(currentData?.vendor?.vendorId); // Store selected value

  // Filter vendors based on the search term
  const filteredVendors = vendorList
    ? vendorList.filter(vendor =>
        vendor.fullName.toLowerCase().includes(searchTerm?.toLowerCase())||
        vendor.arFullName.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    : [];

  // Handle vendor selection
  const handleSelect = (vendorId, vendorName) => {
    setSelectedVendor(vendorId); // Set selected vendor
    setSearchTerm(vendorName); // Set the input value to the selected vendor name
    setShowDropdown(false); // Hide the dropdown after selection
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder={tDataInfo.vendorId?.label}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
        className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
      />

      {/* Dropdown for filtered vendors */}
      {showDropdown && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto mt-1">
          {filteredVendors.length > 0 ? (
            filteredVendors.map(vendor => (
              <li
                key={vendor.vendorId}
                onClick={() => handleSelect(vendor.vendorId, vendor.fullName)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {vendor.fullName}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No Vendor Found</li>
          )}
        </ul>
      )}

      {/* Hidden Select Box (Optional for form submissions) */}
      <select
        name="vendorId"
        value={selectedVendor}
        className="hidden"
      >
        <option key={0} value={-1}>{tDataInfo.vendorId?.label}</option>
        {vendorList && vendorList.map(vendor => (
          <option key={vendor.vendorId} value={vendor.vendorId}>
            {vendor.fullName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VendorSelect;