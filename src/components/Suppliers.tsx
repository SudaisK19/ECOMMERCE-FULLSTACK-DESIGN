import React from "react";
import Image from "next/image";

const suppliers = [
  { country: "Arabic Emirates", domain: "shopname.ae", flag: "/images/icons/AE@2x.png" },
  { country: "Australia", domain: "shopname.ae", flag: "/images/icons/AU@2x.png" },
  { country: "United States", domain: "shopname.ae", flag: "/images/icons/US@2x.png" },
  { country: "Russia", domain: "shopname.ru", flag: "/images/icons/RU@2x.png" },
  { country: "Italy", domain: "shopname.it", flag: "/images/icons/IT@2x.png" },
  { country: "Denmark", domain: "denmark.com.dk", flag: "/images/icons/DK@2x.png" },
  { country: "France", domain: "shopname.com.fr", flag: "/images/icons/FR@2x.png" },
  { country: "Arabic Emirates", domain: "shopname.ae", flag: "/images/icons/AE@2x.png" },
  { country: "China", domain: "shopname.ae", flag: "/images/icons/CN@2x.png" },
  { country: "Great Britain", domain: "shopname.co.uk", flag: "/images/icons/GB@2x.png" },
];

const SuppliersByRegion = () => {
  return (
    <div className="w-full max-w-7xl mt-10">
      <h2 className="text-xl font-semibold mb-4">Suppliers by region</h2>

      {/* Responsive Grid: 2 columns on mobile, 5 on larger screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {suppliers.map((supplier, index) => (
          <div key={index} className="flex items-center space-x-3">
            {/* Flag */}
            <Image src={supplier.flag} alt={supplier.country} width={24} height={16} />

            {/* Country & Domain */}
            <div>
              <p className="text-sm font-medium">{supplier.country}</p>
              <p className="text-xs text-gray-500">{supplier.domain}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersByRegion;
