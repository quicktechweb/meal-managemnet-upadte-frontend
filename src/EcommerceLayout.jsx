import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { CategorySidebar } from "./Components/CategorySidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { FaLaptop, FaMobileAlt, FaTshirt } from "react-icons/fa";
import { CartSidebar } from "./Components/CartSidebar";

const categories = [
  {
    label: "Electronics",
    icon: <FaMobileAlt />,
    submenu: [
      { label: "Mobile Phones", count: 120 },
      { label: "Laptops", count: 80 },
      { label: "Accessories", count: 150 },
    ],
  },
  {
    label: "Fashion",
    icon: <FaTshirt />,
    submenu: [
      { label: "Men", count: 90 },
      { label: "Women", count: 110 },
      { label: "Kids", count: 70 },
    ],
  },
  {
    label: "Computers",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Deli Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Ice Cream",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Snacks",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },

  {
    label: "Coffee",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Deli Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Ice Cream",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Snacks",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },

  {
    label: "Coffee",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
];

const EcommerceLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const toggleCategory = () => {
    setCategoryOpen((prev) => !prev);
    document.body.style.overflow = !categoryOpen ? "hidden" : "visible";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <Navbar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onCategoryOpen={toggleCategory}
      />

      <div className="flex h-full">
        <CategorySidebar
          categories={categories}
          isOpen={categoryOpen}
          onClose={toggleCategory}
        />

        <div
          className="mt-[80px] w-full p-4
            lg:ml-[250px] grow 2xl:ml-[300px]
            lg:max-w-[750px]
            xl:max-w-[1100px]
            2xl:max-w-[1600px]"
        >
          <Outlet />
        </div>
      </div>

      <CartSidebar
        isOpen={isOpen}
        onClose={() => {
          document.body.style.overflow = "visible";
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default EcommerceLayout;
