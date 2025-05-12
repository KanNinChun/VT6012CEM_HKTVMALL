import React, { ChangeEvent, FormEvent, useState } from 'react';
import './ShoppingCart.css';
import shoppingCartScreenshot from './assets/shopping-cart-screenshot.png'; // Adjust path if needed

// --- TYPE DEFINITIONS (Copied from your App.tsx for HeaderProps) ---
type ViewType = 'main' | 'searchResults' | 'feedback' | 'login' | 'register' | 'shoppingCart'; // Added shoppingCart

interface HeaderProps {
  cartItemCount: number;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  animateCartIcon: boolean;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchContainerRef: React.RefObject<HTMLDivElement>;
  onLogoClick: () => void;
  onNavigate: (view: ViewType) => void;
}

// --- Header Component (Copied and simplified from your App.tsx) ---
// In a real application, you would import this from its own file if it's shared.
// For this example, I'm including a simplified version directly.
const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onSearchChange,
  searchTerm,
  animateCartIcon,
  onSearchFocus,
  onSearchBlur,
  onSearchSubmit,
  searchContainerRef,
  onLogoClick,
  onNavigate,
}) => {
  const [isOtherZonesDropdownVisible, setIsOtherZonesDropdownVisible] = useState(false);

  return (
    <header className="hktv-header">
      <div className="header-content-wrapper">
        <div className="logo" onClick={onLogoClick}>
          HKTV mall
        </div>
        <div className="other-zones-container">
          <button
            className="other-zones-btn"
            onMouseEnter={() => setIsOtherZonesDropdownVisible(true)}
            onMouseLeave={() => setIsOtherZonesDropdownVisible(false)}
          >
            ☰ 其他專區
          </button>
          {isOtherZonesDropdownVisible && (
            <div
              className="other-zones-dropdown"
              onMouseEnter={() => setIsOtherZonesDropdownVisible(true)}
              onMouseLeave={() => setIsOtherZonesDropdownVisible(false)}
            >
              <a href="#/zone/Everuts">Everuts</a>
              <a href="#/zone/thirteenlandmarks">13Landmarks</a>
              <a href="#/zone/personalcarenhealth">護理保健</a>
              <a href="#/zone/beautynhealth">護膚化妝</a>
              <a href="#/zone/fashion">時尚服飾</a>
              <a href="#/zone/macau">直送澳門</a>
              <a href="#/zone/pets">寵物用品</a>
              <a href="#/zone/mothernbaby">母嬰育兒</a>
              <a href="#/zone/gadgetsandelectronics">大腦場</a>
              <a href="#/zone/homenfamily">家居電器</a>
              <a href="#/zone/housewares">家品傢俬</a>
              <a href="#/zone/sportsntravel">運動旅行</a>
              <a href="#/zone/toysnbooks">玩具圖書</a>
              <a href="#/zone/finance">保險金融</a>
              <a href="#/zone/deals">吃喝玩樂</a>
            </div>
          )}
        </div>
        <div className="search-container" ref={searchContainerRef}>
          <form className="search-bar-container" onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="搜尋商品..."
              className="search-input"
              value={searchTerm}
              onChange={onSearchChange}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              aria-label="Search Products"
              autoComplete="off"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              🔍
            </button>
          </form>
        </div>
        <div className="user-actions">
          <button className="login-btn" onClick={() => onNavigate("login")}>
            登入
          </button>
          <button
            className={`cart-btn ${animateCartIcon ? "animate-cart" : ""}`}
            onClick={() => onNavigate("shoppingCart")} // Make cart icon navigate to cart page
          >
            購物車 {cartItemCount > 0 && `(${cartItemCount})`}
          </button>
        </div>
      </div>
    </header>
  );
};


// --- ShoppingCart Component ---
interface ShoppingCartPageProps {
  // Props that Header might need from App.tsx state
  cartItemCount: number;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  animateCartIcon: boolean;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchContainerRef: React.RefObject<HTMLDivElement>;
  onLogoClick: () => void;
  onNavigate: (view: ViewType) => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = (props) => {
  return (
    <div className="shopping-cart-page-container">
      <Header
        cartItemCount={props.cartItemCount}
        onSearchChange={props.onSearchChange}
        searchTerm={props.searchTerm}
        animateCartIcon={props.animateCartIcon}
        onSearchFocus={props.onSearchFocus}
        onSearchBlur={props.onSearchBlur}
        onSearchSubmit={props.onSearchSubmit}
        searchContainerRef={props.searchContainerRef}
        onLogoClick={props.onLogoClick}
        onNavigate={props.onNavigate}
      />
      <main className="shopping-cart-content">
        <img src={shoppingCartScreenshot} alt="Shopping Cart Screenshot" className="cart-screenshot-image" />
      </main>
    </div>
  );
};

export default ShoppingCartPage;