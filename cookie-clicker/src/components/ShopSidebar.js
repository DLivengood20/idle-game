import React, { useState } from 'react';
import './styles/ShopSidebar.css';
import ClickerShop from './ClickerShop';

const ShopSidebar = ({
  cookies,
  tier1AutoClickers,
  setTier1AutoClickers,
  tier2AutoClickers,
  setTier2AutoClickers,
  tier3AutoClickers,
  setTier3AutoClickers,
  setCount,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div>
        <ClickerShop
          cookies={cookies}
          autoClickers={tier1AutoClickers}
          setAutoClickers={setTier1AutoClickers}
          tier2AutoClickers={tier2AutoClickers}
          setTier2AutoClickers={setTier2AutoClickers}
          tier3AutoClickers={tier3AutoClickers}
          setTier3AutoClickers={setTier3AutoClickers}
          setCount={setCount}
        />
      </div>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        data-testid="sidebar-toggle"
      >
        {isSidebarOpen ? '<' : '>'}
      </button>
    </div>
  );
};

export default ShopSidebar;
