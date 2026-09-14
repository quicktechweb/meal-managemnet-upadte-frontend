import { createContext, useContext, useState } from "react";

const LayoutSwitchContext = createContext();

const LayoutSwitchProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [hideSidebar, setHideSidebar] = useState(true);
 const [daywiseSelect, setDaywiseSelect] = useState("show-all");
const [openPopup, setOpenPopup] = useState(false);

// ✅ নতুন — Day Wise আর All দুই ভিউ-তেই একই selectedDays শেয়ার হবে
const [selectedDays, setSelectedDays] = useState([]);
const [activeDayView, setActiveDayView] = useState(null);

const value = {
  selectedMenu,
  setSelectedMenu,
  setOpenPopup,
  openPopup,
  setDaywiseSelect,
  daywiseSelect,
  hideSidebar,
  setHideSidebar,
  selectedDays,
  setSelectedDays,
  activeDayView,
  setActiveDayView,
};

  return (
    <LayoutSwitchContext.Provider value={value}>
      {children}
    </LayoutSwitchContext.Provider>
  );
};

export const useLayoutSwitch = () => useContext(LayoutSwitchContext);

export default LayoutSwitchProvider;
