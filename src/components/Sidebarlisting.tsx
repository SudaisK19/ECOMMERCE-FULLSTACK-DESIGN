"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Category Interface
interface Category {
  _id: string;
  name: string;
}

const Sidebar = () => {
  const { catID } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(999999);

  useEffect(() => {
    fetch("/api/shop/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <aside className="w-72 px-4 py-3">
      {/* Dynamic Categories */}
      <CollapsibleSection title="Category">
        <ul className="text-sm text-gray-600 space-y-1">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id}>
                <Link
                  href={`/product-listing/${category._id}`}
                  className={`block ${
                    catID === category._id ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))
          ) : (
            <li>No categories available</li>
          )}
        </ul>
      </CollapsibleSection>

      {/* Brands */}
      <CollapsibleSection title="Brands">
        {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((brand) => (
          <CheckboxItem key={brand} label={brand} />
        ))}
      </CollapsibleSection>

      {/* Features */}
      <CollapsibleSection title="Features">
        {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map((feature) => (
          <CheckboxItem key={feature} label={feature} />
        ))}
      </CollapsibleSection>

      {/* Price Range */}
      <CollapsibleSection title="Price range">
        <PriceRange
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
        />
      </CollapsibleSection>

      {/* Condition */}
      <CollapsibleSection title="Condition">
        {["Any", "Refurbished", "Brand new", "Old items"].map((condition, index) => (
          <RadioItem key={condition} label={condition} checked={index === 0} />
        ))}
      </CollapsibleSection>

      {/* Ratings */}
      <CollapsibleSection title="Ratings">
        {[5, 4, 3, 2].map((stars) => (
          <RatingItem key={stars} stars={stars} />
        ))}
      </CollapsibleSection>
    </aside>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-3 border-b pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-gray-700 text-sm font-medium"
      >
        {title}
        {isOpen ? <FaChevronUp className="text-gray-500 text-xs" /> : <FaChevronDown className="text-gray-500 text-xs" />}
      </button>
      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
};

// Checkbox Component
const CheckboxItem = ({ label }: { label: string }) => (
  <div className="flex items-center space-x-2 my-1">
    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300" />
    <label className="text-sm text-gray-600">{label}</label>
  </div>
);

// Radio Button Component
const RadioItem = ({ label, checked }: { label: string; checked?: boolean }) => (
  <div className="flex items-center space-x-2 my-1">
    <input type="radio" name="condition" defaultChecked={checked} className="w-4 h-4 text-blue-600 border-gray-300" />
    <label className="text-sm text-gray-600">{label}</label>
  </div>
);

// Price Range Component
const PriceRange = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxValue) setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minValue) setMaxValue(value);
  };

  return (
    <div className="space-y-3">
      {/* Range Slider */}
      <div className="relative h-6 flex items-center">
        <input
          type="range"
          min="0"
          max="999999"
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min="0"
          max="999999"
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div
          className="absolute h-1 bg-blue-500 rounded-lg"
          style={{
            left: `${(minValue / 999999) * 100}%`,
            right: `${100 - (maxValue / 999999) * 100}%`,
          }}
        ></div>
      </div>

      {/* Min & Max Inputs */}
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <label className="block">Min</label>
          <input
            type="number"
            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center bg-gray-100"
            value={minValue}
            onChange={handleMinChange}
          />
        </div>
        <div>
          <label className="block">Max</label>
          <input
            type="number"
            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center bg-gray-100"
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-white border border-blue-500 text-blue-500 py-1 rounded-md hover:bg-blue-500 hover:text-white transition">
        Apply
      </button>
    </div>
  );
};

// Ratings Component with Star Icons
const RatingItem = ({ stars }: { stars: number }) => {
  const filledStars = Array(stars).fill("images/icons/3.png");
  const emptyStars = Array(5 - stars).fill("images/icons/5.png");

  return (
    <div className="flex items-center space-x-2 my-1">
      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300" />
      <div className="flex">
        {[...filledStars, ...emptyStars].map((imgSrc, index) => (
          <img key={index} src={`/${imgSrc}`} alt="star" className="h-4" />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
