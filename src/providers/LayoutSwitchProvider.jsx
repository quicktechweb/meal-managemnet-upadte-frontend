import { createContext, useContext, useState } from "react";

const LayoutSwitchContext = createContext();

const LayoutSwitchProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [daywiseSelect, setDaywiseSelect] = useState("show-all");
  const [openPopup, setOpenPopup] = useState(false);

  const value = {
    selectedMenu,
    setSelectedMenu,
    setOpenPopup,
    openPopup,
    setDaywiseSelect,
    daywiseSelect,
  };

  return (
    <LayoutSwitchContext.Provider value={value}>
      {children}
    </LayoutSwitchContext.Provider>
  );
};

export const useLayoutSwitch = () => useContext(LayoutSwitchContext);

export default LayoutSwitchProvider;
