import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import './App.css';
import FeedbackPage from './FeedbackPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ShoppingCartPage from './ShoppingCart'; // Import the new component

interface Product {
  id: number; category: string;
  name: string;
  image: string;
  originalPrice?: number;
  currentPrice: number;
  description: string;
  countryFlag?: string;
  rating?: string;
  specialTag?: string;
}

interface TopBannerCategory {
  name: string;
  image: string;
}

interface PromotionSlide {
  id: number;
  imageUrl: string;
  altText: string;
  linkUrl?: string;
}

interface Suggestion {
  type: 'keyword' | 'category';
  text: string;
  categoryContext?: string;
  searchTerm: string;
}

interface SearchFilterOptions {
  priceRange: { min: number; max: number };
  brands: string[];
}

const allProductsData: Product[] = [
  {
    id: 1,
    category: "酒類",
    name: "BEEHIVE - VSOP XO 700ml (gift box)",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/2a6c/777e/7c31/umkapyhALp20250321031216_1200.png",
    originalPrice: 500.0,
    currentPrice: 328.0,
    description: "700毫升",
    countryFlag: "🇫🇷",
    rating: "95",
  },
  {
    id: 2,
    category: "酒類",
    name: "KATO - 紐西蘭白酒 Marlborough Sauvignon",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/5d12/01a7/c731/VRgXvYXyue20250225110156_96.png",
    originalPrice: 299.0,
    currentPrice: 108.0,
    description: "750毫升",
    countryFlag: "🇳🇿",
    rating: "92",
  },
  {
    id: 3,
    category: "酒類",
    name: "De BORTOLI - 澳洲白酒 Sacred Hill Semillon",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/aed2/e41e/773a/irhkxzcYqC20250216231950_96.png",
    originalPrice: 299.0,
    currentPrice: 108.0,
    description: "750毫升",
    countryFlag: "🇦🇺",
  },
  {
    id: 4,
    category: "酒類",
    name: "De BORTOLI - 澳洲紅酒 Sacred Hill Shiraz",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/1f3b/b421/137d/YZPHVJFANz20250216231743_96.png",
    originalPrice: 299.0,
    currentPrice: 108.0,
    description: "750毫升",
    countryFlag: "🇦🇺",
  },
  {
    id: 5,
    category: "酒類",
    name: "Kemenys Hidden Label - 澳洲紅酒 Clare Valley",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/2bdd/d829/b6f2/fuVgJACSta20250209130341_96.png",
    originalPrice: 299.0,
    currentPrice: 128.0,
    description: "750毫升",
    countryFlag: "🇦🇺",
    rating: "93",
  },
  {
    id: 6,
    category: "酒類",
    name: "RED BRIDGE - 澳洲白酒 Chardonnay 2023",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/87ec/3ca1/92c6/WhaOJOBYpk20241109103827_96.png",
    originalPrice: 299.0,
    currentPrice: 138.0,
    description: "750毫升",
    countryFlag: "🇦🇺",
    specialTag: "限1,000里賞定向抵用券",
  },
  {
    id: 7,
    category: "零食",
    name: "樂事-燒烤味薯片 LAY'S Barbecue Potato Chips",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/bfbf/9241/e7ec/GQosBduOyc20240105153541_96.jpg",
    currentPrice: 15.0,
    description: "100克",
  },
  {
    id: 8,
    category: "零食",
    name: "朱古力味百力滋-家庭裝",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/bd9b/fabb/cd72/AeyLqZbqqo20220928162818_96.png",
    currentPrice: 25.0,
    description: "5包入",
  },
  {
    id: 9,
    category: "零食",
    name: "古法婆婆 - 蕎麥紫米海苔脆片",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/8d39/14d6/178f/QvdsSKawiu20230310161322_96.jpg",
    originalPrice: 20.0,
    currentPrice: 18.0,
    description: "50克",
  },
  {
    id: 10,
    category: "大特價",
    name: "可口可樂 - [原箱] 罐裝可口可樂汽水 Coke",
    image:
      "https://images.hktvmall.com/h0001001/9e9ada6b0f32f2abbb16b7c412786cbf355f587b/h0001001_h0888001_s_p10021200_160810054333_07_96.jpg",
    originalPrice: 164.0,
    currentPrice: 87.0,
    description: "6罐裝",
  },
  {
    id: 11,
    category: "大特價",
    name: "日版原箱-Wonda極濃香深煎無糖黑咖啡",
    image:
      "https://cdn-mms.hktvmall.com/HKTV/mms/uploadProductImage/b4f5/5683/9f8d/gzHAVLPfLj20240501231318_96.jpg",
    originalPrice: 188.0,
    currentPrice: 128.0,
    description: "400毫升 x 12",
    countryFlag: "jp",
  },
  {
    id: 12,
    category: "飲品",
    name: "飛雪 Bonaqua - 礦物質水500mL x 24樽",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/3830/2525/81d5/UKUbvcixmk20230310173748_96.jpg",
    originalPrice: 100.0,
    currentPrice: 72.0,
    description: "1箱 (24樽)",
  },
  {
    id: 13,
    category: "麵",
    name: "出前一丁 - 麻油味即食麵",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/7248/0a16/4c98/oESpShNvYY20220215142919_96.png",
    currentPrice: 40.0,
    description: "100克",
  },
  {
    id: 14,
    category: "咖啡",
    name: "UCC - 117 即溶咖啡",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/b568/2501/8e34/OrqTuLuriO20240113192429_96.png",
    currentPrice: 45.0,
    description: "精選咖啡No.117 90克",
  },
  {
    id: 15,
    category: "米",
    name: "金象牌 - 頂上茉莉香米",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/c270/16b7/392b/EnLrJTgErK20220119124336_96.png",
    originalPrice: 208.0,
    currentPrice: 168.0,
    description: "(8KG) 金象牌 頂上茉莉香米",
  },
  {
    id: 16,
    category: "飲品",
    name: "Coke Zero 可口可樂無糖汽水",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/0df0/b5e6/9e4f/OLEGtRTGUE20250317113835_96.jpg",
    originalPrice: 60.0,
    currentPrice: 40.0,
    description: "330毫升 x 8",
  },
  {
    id: 17,
    category: "麵",
    name: "超力 - 熊井稻庭手打風味烏冬",
    image:
      "https://cdn-mms.hktvmall.com/HKTV/mms/uploadProductImage/35e3/92d6/9d03/qcTxHKMmQf20240424160531_96.jpg",
    originalPrice: 77.8,
    currentPrice: 69.5,
    description: "240克 x 5",
  },
  {
    id: 18,
    category: "麵",
    name: "口碑 - 韓國-炸醬麵",
    image:
      "https://cdn-mms.hktvmall.com/HKTV/mms/uploadProductImage/1b9a/02ad/5cda/UYtWPcbXlw20240415154409_96.jpg",
    originalPrice: 98.0,
    currentPrice: 72.0,
    description: "920克",
  },
  {
    id: 19,
    category: "罐頭",
    name: "Hashimoto - 日本北海道 即食紅豆罐頭",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/cefa/8416/bc1d/icuAvySXaS20230502175738_96.jpg",
    originalPrice: 39.0,
    currentPrice: 15.0,
    description: "190克",
  },
  {
    id: 20,
    category: "罐頭",
    name: "天壇牌 - 火腿豬肉 340g (2件) 午餐肉 罐頭",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/22d4/25b9/fc4b/OMEUyxBwyw20220306232030_96.jpg",
    currentPrice: 58.0,
    description: "340克 X 2",
  },
  {
    id: 21,
    category: "調味醬料",
    name: "李錦記 - ( 510g 樽裝蠔油) 李錦記舊庄特級蠔油",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/8e8f/d7fb/f45a/PPdnYyNGYC20241220002134_96.jpg",
    currentPrice: 49.0,
    description: "(510g 樽裝) 李錦記舊庄特級蠔油",
  },
  {
    id: 22,
    category: "調味醬料",
    name: "冠益華記 - [香港製造]辣椒醬",
    image:
      "https://images.hktvmall.com/h0888001/17385edb3509ae97264cdf0fe14935a9948ebde3/h0888001_10147601_220609115204_01_96.jpg",
    originalPrice: 37.0,
    currentPrice: 35.0,
    description: "312克",
  },
  {
    id: 23,
    category: "家具清潔用品",
    name: "babyganics - [香港行貨] 萬用家居清潔劑 - 無香味 946ml",
    image:
      "https://images.hktv-img.com/images/HKTV/12317/BG-010067_main_59058812_20210202162926_01_96.jpg",
    originalPrice: 99.0,
    currentPrice: 72.0,
    description:
      "適用於清潔桌面、幼兒餐椅、玻璃、牆壁、木地板、磁磚、不鏽鋼或其他家居表面",
  },
  {
    id: 24,
    category: "家具清潔用品",
    name: "Bio-home - 地板清潔劑 1.5L (免過水 快乾 Babe Safe 大大支)",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/fe7e/4ffa/1327/werGtXLLST20211213202136_96.jpg",
    originalPrice: 125.0,
    currentPrice: 92.0,
    description:
      "地板清潔劑 1.5L (不同批次label / 樽身印字/ 樽蓋顏色隨機發貨，并不影響原廠品質)",
  },
  {
    id: 25,
    category: "醫藥產品",
    name: "余仁生 - 止嗽散顆粒",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/c9f0/f497/97a3/zLeqfwknoh20250323020837_96.jpg",
    currentPrice: 49.0,
    description: "1盒",
  },
  {
    id: 26,
    category: "醫藥產品",
    name: "康維他 - 麥蘆卡蜂蜜蜂膠潤喉糖 500g (檸檬味)",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/4d38/2a4a/98b6/fDDeOmbtLB20221124125244_96.jpg",
    currentPrice: 156.0,
    description: "920克",
  },
  {
    id: 27,
    category: "食用油",
    name: "萬歲 - 粟米油",
    image:
      "https://images.hktvmall.com/h0888001/12168/h0888001_10020198_150922100532_01_96.jpg",
    originalPrice: 129.0,
    currentPrice: 84.0,
    description: "900毫升 x 3",
  },
  {
    id: 28,
    category: "食用油",
    name: "獅球嘜 - 獅球嘜純正花生油",
    image:
      "https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/b02d/dc76/3235/XOoKZJdMik20240229104400_96.jpg",
    originalPrice: 145.9,
    currentPrice: 132.9,
    description: "900毫升 x 4",
  },
  {
    id: 29,
    category: "米",
    name: "富貴花 - 泰國原裝頂級茉莉香米",
    image:
      "https://cdn-media.hktvmall.com/hktv-mms/HKTV/mms/uploadProductImage/43b5/059e/642f/OflHviqnjR20240819172929_96.jpg",
    originalPrice: 99.9,
    currentPrice: 65.0,
    description: "5公斤",
    countryFlag: "TH",
  },
];
const topBannerCategoriesData: TopBannerCategory[] = [
  {
    name: "茶類飲品",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516024941.jpg",
  },
  {
    name: "汽水",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516024901.jpg",
  },
  {
    name: "點心及包點",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025840.jpg",
  },
  {
    name: "薯片 餅片",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025030.jpg",
  },
  {
    name: "衛生卷紙",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025015.jpg",
  },
  {
    name: "萬用廚房紙",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025357.jpg",
  },
  {
    name: "廚房清潔",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516030059.jpg",
  },
  {
    name: "牛奶 豆奶",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025233.jpg",
  },
  {
    name: "咖啡",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_250430054629.jpg",
  },
  {
    name: "早餐/果醬",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025648.jpg",
  },
  {
    name: "調味醬料",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025514.jpg",
  },
  {
    name: "即沖飲品",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_250430054704.jpg",
  },
  {
    name: "果汁",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025924.jpg",
  },
  {
    name: "水",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_230214040340.jpg",
  },
  {
    name: "餅乾",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025630.jpg",
  },
  {
    name: "米",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_250430054511.jpg",
  },
  {
    name: "食油",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025054.jpg",
  },
  {
    name: "日本麵/烏冬",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025710.jpg",
  },
  {
    name: "即食麵",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_250430054413.jpg",
  },
  {
    name: "紅酒",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025941.jpg",
  },
  {
    name: "威士忌/烈酒",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025310.jpg",
  },
  {
    name: "罐頭",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025416.jpg",
  },
  {
    name: "蔘茸海味",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_250430054437.jpg",
  },
  {
    name: "洗衣用品",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_250401095949.jpg",
  },
  {
    name: "漂白/消毒水",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516024920.jpg",
  },
  {
    name: "濕紙巾",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_220516025813.jpg",
  },
  {
    name: "抽濕用品",
    image:
      "https://images.hktvmall.com/hot_categories/bannerzh_230210041545.jpg",
  },
];
const NUMBER_OF_INITIAL_TOP_CATEGORIES = 7;
const sidebarCategoriesData: string[] = [
  "麵",
  "零食",
  "飲品",
  "咖啡",
  "罐頭",
  "調味醬料",
  "米 / 食用油",
  "醫藥產品",
  "家具清潔用品",
  "酒類",
];

const promotionSlidesData: PromotionSlide[] = [
  {
    id: 1,
    imageUrl:
      "https://cdn-media.hktvmall.com/mkgb/mkgb/landing/nli/mai/aPnQylWLXr20250323000336.jpg",
    altText: "Promotion 1: Beef Balls Special",
    linkUrl: "#/promo/beefballs",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn-media.hktvmall.com/mkgb/mkgb/landing/rlx/uxm/SgurCuAHzw20250318224812.jpg",
    altText: "Promotion 2: Summer Drinks Fest",
    linkUrl: "#/promo/summerdrinks",
  },
  {
    id: 3,
    imageUrl:
      "https://cdn-media.hktvmall.com/mkgb/mkgb/landing/nss/veq/jczUWsByOp20250307103716.jpg",
    altText: "Promotion 3: Electronics Sale",
    linkUrl: "#/promo/electronics",
  },
];

const generateSuggestions = (
  term: string,
  products: Product[],
  categories: string[]
): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const lowerTerm = term.toLowerCase().trim();
  if (!lowerTerm) return [];
  const keywordMatches = new Set<string>();
  if (lowerTerm === "coke") {
    keywordMatches.add("coke zero");
    keywordMatches.add("coke 可口可樂無糖汽水");
    keywordMatches.add("zero coke");
  } else if (lowerTerm === "zero") {
    keywordMatches.add("zero coke");
  }
  products.forEach((p) => {
    if (keywordMatches.size >= 4) return;
    if (p.name.toLowerCase().includes(lowerTerm)) {
      let s = p.name;
      if (s.length > 35) {
        s = s.substring(0, 32) + "...";
      }
      keywordMatches.add(s);
    }
  });
  keywordMatches.forEach((match) =>
    suggestions.push({ type: "keyword", text: match, searchTerm: match })
  );
  const categoryMatches = new Set<string>();
  if (lowerTerm === "coke") {
    categoryMatches.add("飲品 即沖飲品");
    categoryMatches.add("重量級推介");
    categoryMatches.add("洗衣機 雪櫃 冷氣機");
    categoryMatches.add("酒類");
    categoryMatches.add("餐桌用品");
  } else {
    categories.slice(0, 5).forEach((cat) => categoryMatches.add(cat));
  }
  categoryMatches.forEach((catContext) => {
    suggestions.push({
      type: "category",
      text: `${term} 在 ${catContext}`,
      categoryContext: catContext,
      searchTerm: term,
    });
  });
  return suggestions.slice(0, 10);
};

type ViewType = 'main' | 'searchResults' | 'feedback' | 'login' | 'register' | 'shoppingCart';;

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

interface TopBannerProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onCategoryClick: (categoryName: string) => void;
  categories: TopBannerCategory[];
  initialCount: number;
}

interface SidebarProps {
  categories: string[];
  onCategorySelect: (categoryName: string) => void;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

interface ProductSectionProps {
  products: Product[];
  activeTab: string | null;
  onTabChange: (tabName: string) => void;
  onAddToCart: (product: Product) => void;
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  isVisible: boolean;
  onSuggestionClick: (suggestion: Suggestion) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface PromotionBannerProps {
  slides: PromotionSlide[];
}

interface SearchFilterSidebarProps {
  allBrands: string[];
  currentFilters: SearchFilterOptions;
  onFilterChange: (newFilters: Partial<SearchFilterOptions>) => void;
  defaultPriceMax: number;
}

interface SearchResultsPageProps {
  searchTermQuery: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

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
  const [isOtherZonesDropdownVisible, setIsOtherZonesDropdownVisible] =
    useState(false);
  return (
    <header className="hktv-header">
      {" "}
      <div className="header-content-wrapper">
        {" "}
        <div className="logo" onClick={onLogoClick}>
          HKTV mall
        </div>{" "}
        <div className="other-zones-container">
          {" "}
          <button
            className="other-zones-btn"
            onMouseEnter={() => setIsOtherZonesDropdownVisible(true)}
            onMouseLeave={() => setIsOtherZonesDropdownVisible(false)}
          >
            {" "}
            ☰ 其他專區{" "}
          </button>{" "}
          {isOtherZonesDropdownVisible && (
            <div
              className="other-zones-dropdown"
              onMouseEnter={() => setIsOtherZonesDropdownVisible(true)}
              onMouseLeave={() => setIsOtherZonesDropdownVisible(false)}
            >
              {" "}
              <a href="#/zone/Everuts">Everuts</a>{" "}
              <a href="#/zone/thirteenlandmarks">13Landmarks</a>{" "}
              <a href="#/zone/personalcarenhealth">護理保健</a>{" "}
              <a href="#/zone/beautynhealth">護膚化妝</a>{" "}
              <a href="#/zone/fashion">時尚服飾</a>{" "}
              <a href="#/zone/macau">直送澳門</a>{" "}
              <a href="#/zone/pets">寵物用品</a>{" "}
              <a href="#/zone/mothernbaby">母嬰育兒</a>{" "}
              <a href="#/zone/gadgetsandelectronics">大腦場</a>{" "}
              <a href="#/zone/homenfamily">家居電器</a>{" "}
              <a href="#/zone/housewares">家品傢俬</a>{" "}
              <a href="#/zone/sportsntravel">運動旅行</a>{" "}
              <a href="#/zone/toysnbooks">玩具圖書</a>{" "}
              <a href="#/zone/finance">保險金融</a>{" "}
              <a href="#/zone/deals">吃喝玩樂</a>{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div className="search-container" ref={searchContainerRef}>
          {" "}
          <form className="search-bar-container" onSubmit={onSearchSubmit}>
            {" "}
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
            />{" "}
            <button type="submit" className="search-btn" aria-label="Search">
              🔍
            </button>{" "}
          </form>{" "}
        </div>{" "}
        <div className="user-actions">
          {" "}
          <button className="login-btn" onClick={() => onNavigate("login")}>
            登入
          </button>{" "}
          <button
            className={`cart-btn ${animateCartIcon ? "animate-cart" : ""}`}
            onClick={() => onNavigate("shoppingCart")}
          >
            {" "}
            購物車 {cartItemCount > 0 && `(${cartItemCount})`}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
};

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  isVisible,
  onSuggestionClick,
  containerRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    if (containerRef.current && dropdownRef.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      const bRect = document.body.getBoundingClientRect();
      const top = cRect.bottom - bRect.top;
      const left = cRect.left - bRect.left;
      setStyle({
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${cRect.width}px`,
        zIndex: 1100,
      });
    }
  }, [containerRef, isVisible]);
  if (!isVisible || suggestions.length === 0) return null;
  const kwSugs = suggestions.filter((s) => s.type === "keyword");
  const catSugs = suggestions.filter((s) => s.type === "category");
  const handleMD = (e: React.MouseEvent) => e.preventDefault();
  return (
    <div
      ref={dropdownRef}
      className="search-suggestions-dropdown"
      style={style}
      onMouseDown={handleMD}
    >
      {" "}
      {kwSugs.length > 0 && (
        <div className="suggestion-group">
          {" "}
          <h4 className="suggestion-group-title">關鍵字搜尋</h4>{" "}
          {kwSugs.map((s, i) => (
            <div
              key={`k-${i}`}
              className="suggestion-item"
              onClick={() => onSuggestionClick(s)}
              role="option"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && onSuggestionClick(s)}
            >
              {" "}
              <span className="suggestion-icon">🔍</span> {s.text}{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
      {catSugs.length > 0 && (
        <div className="suggestion-group">
          {" "}
          <h4 className="suggestion-group-title">在不同分類下搜尋</h4>{" "}
          {catSugs.map((s, i) => (
            <div
              key={`c-${i}`}
              className="suggestion-item"
              onClick={() => onSuggestionClick(s)}
              role="option"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && onSuggestionClick(s)}
            >
              {" "}
              <span className="suggestion-icon">🔍</span> {s.text}{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
};

const TopBanner: React.FC<TopBannerProps> = ({
  categories,
  initialCount,
  isExpanded,
  onToggleExpand,
  onCategoryClick,
}) => {
  const visCats = categories.slice(0, initialCount);
  const hidCats = categories.slice(initialCount);
  const renderCat = (c: TopBannerCategory, kSuf: string) => (
    <div
      key={c.name + "-" + kSuf}
      className="banner-category-item"
      onClick={() => onCategoryClick(c.name)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onCategoryClick(c.name)}
    >
      {" "}
      <div className="banner-category-image-container">
        {" "}
        <img src={c.image} alt={c.name} />{" "}
      </div>{" "}
      <span>{c.name}</span>{" "}
    </div>
  );
  return (
    <div className={`top-banner ${isExpanded ? "expanded" : ""}`}>
      {" "}
      <div className="top-banner-header-content">
        {" "}
        <div className="banner-title-container">
          {" "}
          <h2 className="banner-title">
            {" "}
            超級市場 <br /> 熱門分類{" "}
          </h2>{" "}
        </div>{" "}
        <div className="banner-categories initial-categories">
          {" "}
          {visCats.map((c) => renderCat(c, "initial"))}{" "}
        </div>{" "}
      </div>{" "}
      <div
        className={`banner-categories-expanded-container ${isExpanded ? "open" : ""
          }`}
      >
        {" "}
        <div className="banner-categories expanded-categories-grid">
          {" "}
          {hidCats.map((c) => renderCat(c, "expanded"))}{" "}
        </div>{" "}
      </div>{" "}
      <button onClick={onToggleExpand} className="view-all-supermarket-btn">
        {" "}
        {isExpanded ? "收起部分 超級市場 分類" : "查看全部 超級市場 分類"}{" "}
        <span className={`arrow ${isExpanded ? "up" : "down"}`}></span>{" "}
      </button>{" "}
    </div>
  );
};
const Sidebar: React.FC<SidebarProps> = ({ categories, onCategorySelect }) => {
  return (
    <aside className="sidebar">
      {" "}
      <h3>☰ 商品類型</h3>{" "}
      <ul>
        {" "}
        {categories.map((c) => (
          <li key={c} onClick={() => onCategorySelect(c)}>
            {" "}
            {c}{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </aside>
  );
};
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [btnSt, setBtnSt] = useState<"idle" | "adding" | "added">("idle");
  const onClk = () => {
    if (btnSt !== "idle") return;
    onAddToCart(product);
    setBtnSt("adding");
    setTimeout(() => {
      setBtnSt("added");
      setTimeout(() => {
        setBtnSt("idle");
      }, 1500);
    }, 700);
  };
  return (
    <div className="product-card">
      {" "}
      {product.specialTag && (
        <div className="special-tag">{product.specialTag}</div>
      )}{" "}
      <div className="product-image-container">
        {" "}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />{" "}
        {product.countryFlag && (
          <span className="country-flag">{product.countryFlag}</span>
        )}{" "}
        {product.rating && (
          <span className="rating-badge">{product.rating}</span>
        )}{" "}
      </div>{" "}
      <h4 className="product-name">{product.name}</h4>{" "}
      <p className="product-description">{product.description}</p>{" "}
      <div className="product-price">
        {" "}
        {product.originalPrice && (
          <span className="original-price">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}{" "}
        <span className="current-price">
          ${product.currentPrice.toFixed(2)}
        </span>{" "}
      </div>{" "}
      <button
        className={`add-to-cart-btn ${btnSt !== "idle" ? `btn-${btnSt}` : ""}`}
        onClick={onClk}
        disabled={btnSt !== "idle"}
      >
        {" "}
        {btnSt === "idle" && <>🛒 加入購物車</>}{" "}
        {btnSt === "adding" && "處理中..."} {btnSt === "added" && "✓ 已加入!"}{" "}
      </button>{" "}
    </div>
  );
};

const PromotionBanner: React.FC<PromotionBannerProps> = ({ slides }) => {
  const [currIdx, setCurrIdx] = useState(0); const tRef = useRef<NodeJS.Timeout | null>(null);
  const rstT = () => { if (tRef.current) clearTimeout(tRef.current); };
  useEffect(() => { rstT(); tRef.current = setTimeout(() => setCurrIdx((pI) => pI === slides.length - 1 ? 0 : pI + 1), 3000); return () => rstT(); }, [currIdx, slides.length]);
  const goPrev = () => setCurrIdx(currIdx === 0 ? slides.length - 1 : currIdx - 1);
  const goNext = () => setCurrIdx(currIdx === slides.length - 1 ? 0 : currIdx + 1);
  const goSlide = (idx: number) => setCurrIdx(idx);
  if (!slides || slides.length === 0) return null; const currS = slides[currIdx];
  return (
    <div className="promotion-banner-container">
      {" "}
      <div className="promotion-banner-slider">
        {" "}
        <a
          href={currS.linkUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="promotion-slide-link"
        >
          {" "}
          <img
            src={currS.imageUrl}
            alt={currS.altText}
            className="promotion-slide-image"
          />{" "}
        </a>{" "}
      </div>{" "}
      <button
        onClick={goPrev}
        className="promo-nav-arrow prev-arrow"
        aria-label="Previous"
      >
        ❮
      </button>{" "}
      <button
        onClick={goNext}
        className="promo-nav-arrow next-arrow"
        aria-label="Next"
      >
        ❯
      </button>{" "}
      <div className="promo-dots-container">
        {" "}
        {slides.map((_, sIdx) => (
          <button
            key={sIdx}
            onClick={() => goSlide(sIdx)}
            className={`promo-dot ${currIdx === sIdx ? "active" : ""}`}
            aria-label={`Slide ${sIdx + 1}`}
          >
            {" "}
            {sIdx + 1}{" "}
          </button>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
const SearchFilterSidebar: React.FC<SearchFilterSidebarProps> = ({ allBrands, currentFilters, onFilterChange, defaultPriceMax }) => {
  const [minP, setMinP] = useState(currentFilters.priceRange.min); const [maxP, setMaxP] = useState(currentFilters.priceRange.max);
  useEffect(() => { setMinP(currentFilters.priceRange.min); setMaxP(currentFilters.priceRange.max); }, [currentFilters.priceRange]);
  const onPChg = () => { const nMin = +minP; const nMax = +maxP; if (!isNaN(nMin) && !isNaN(nMax) && nMin <= nMax && nMin >= 0 && nMax <= defaultPriceMax) onFilterChange({ priceRange: { min: nMin, max: nMax } }); };
  const onMinPIn = (e: ChangeEvent<HTMLInputElement>) => setMinP(+e.target.value); const onMaxPIn = (e: ChangeEvent<HTMLInputElement>) => setMaxP(+e.target.value);
  const onBrTog = (b: string) => { const nBs = currentFilters.brands.includes(b) ? currentFilters.brands.filter(br => br !== b) : [...currentFilters.brands, b]; onFilterChange({ brands: nBs }); };
  return (
    <aside className="search-filter-sidebar">
      {" "}
      <h4>篩選條件</h4>{" "}
      <div className="filter-group">
        {" "}
        <h5>價錢</h5>{" "}
        <div className="price-slider-inputs">
          {" "}
          <span>${minP}</span> - <span>${maxP}</span>{" "}
        </div>{" "}
        <div className="price-inputs-for-slider">
          {" "}
          <input
            type="number"
            value={minP}
            onChange={onMinPIn}
            onBlur={onPChg}
            min="0"
            max={defaultPriceMax}
          />{" "}
          <input
            type="number"
            value={maxP}
            onChange={onMaxPIn}
            onBlur={onPChg}
            min="0"
            max={defaultPriceMax}
          />{" "}
        </div>{" "}
      </div>{" "}
      <div className="filter-group">
        {" "}
        <h5>品牌</h5>{" "}
        <ul className="brand-filter-list">
          {" "}
          {allBrands.map((b) => (
            <li key={b}>
              {" "}
              <label>
                {" "}
                <input
                  type="checkbox"
                  checked={currentFilters.brands.includes(b)}
                  onChange={() => onBrTog(b)}
                />{" "}
                {b}{" "}
              </label>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </div>{" "}
    </aside>
  );

};
const SearchResultsGrid: React.FC<{ products: Product[]; onAddToCart: (product: Product) => void }> = ({ products, onAddToCart }) => { return (<div className="product-grid search-results-grid"> {products.length > 0 ? products.map(p => (<ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)) : <p>沒有找到符合篩選條件的商品。</p>} </div>); };
const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ searchTermQuery, products: initProds, onAddToCart }) => {
  const [filtProds, setFiltProds] = useState<Product[]>(initProds); const [currSort, setCurrSort] = useState<string>('綜合評分'); const [totRes, setTotRes] = useState<number>(initProds.length);
  const allBrds = Array.from(new Set(initProds.map(p => p.category))); const maxPPrice = Math.max(...initProds.map(p => p.currentPrice), 0) || 1000;
  const [srchFilts, setSrchFilts] = useState<SearchFilterOptions>({ priceRange: { min: 0, max: maxPPrice }, brands: [], });
  useEffect(() => { let tProds = [...initProds]; tProds = tProds.filter(p => p.currentPrice >= srchFilts.priceRange.min && p.currentPrice <= srchFilts.priceRange.max); if (srchFilts.brands.length > 0) tProds = tProds.filter(p => srchFilts.brands.includes(p.category)); if (currSort === '價格低至高') tProds.sort((a, b) => a.currentPrice - b.currentPrice); else if (currSort === '價格高至低') tProds.sort((a, b) => b.currentPrice - a.currentPrice); setFiltProds(tProds); setTotRes(tProds.length); }, [initProds, srchFilts, currSort]);
  const onFiltChg = (nFilts: Partial<SearchFilterOptions>) => setSrchFilts(p => ({ ...p, ...nFilts }));
  const onSortChg = (e: ChangeEvent<HTMLSelectElement>) => setCurrSort(e.target.value);
  return (
    <div className="search-results-page">
      {" "}
      <div className="search-results-header">
        {" "}
        <p className="breadcrumbs">全部商品 - "{searchTermQuery}"</p>{" "}
        <div className="search-summary-and-sort">
          {" "}
          <p className="results-count">
            顯示: 1 - {Math.min(60, totRes)} (共 {totRes} 件)
          </p>{" "}
          <div className="sort-options">
            {" "}
            <label htmlFor="sort-by">排序:</label>{" "}
            <select id="sort-by" value={currSort} onChange={onSortChg}>
              {" "}
              <option value="綜合評分">綜合評分</option>{" "}
              <option value="價格低至高">價格低至高</option>{" "}
              <option value="價格高至低">價格高至低</option>{" "}
            </select>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="search-results-content">
        {" "}
        <SearchFilterSidebar
          allBrands={allBrds}
          currentFilters={srchFilts}
          onFilterChange={onFiltChg}
          defaultPriceMax={maxPPrice}
        />{" "}
        <SearchResultsGrid products={filtProds} onAddToCart={onAddToCart} />{" "}
      </div>{" "}
    </div>
  );
};

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  activeTab,
  onTabChange,
  onAddToCart,
}) => {
  const tabs: string[] = ["酒類", "零食", "大特價"];
  return (
    <section className="product-section">
      {" "}
      <div className="tabs">
        {" "}
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? "active" : ""}`}
            onClick={() => onTabChange(t)}
            data-tab={t}
          >
            {" "}
            {t}{" "}
          </button>
        ))}{" "}
      </div>{" "}
      <div className="product-grid">
        {" "}
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p>沒有找到符合條件的商品。</p>
        )}{" "}
      </div>{" "}
    </section>
  );
};

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="hktv-footer">
      {" "}
      <div className="footer-content-wrapper">
        {" "}
        <div className="footer-links">
          {" "}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("main");
            }}
          >
            關於我們
          </a>{" "}
          <a
            href="#guide"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("main");
            }}
          >
            新手攻略
          </a>{" "}
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("main");
            }}
          >
            常見問題
          </a>{" "}
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("main");
            }}
          >
            私隱政策
          </a>{" "}
          <a
            href="#feedback"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("feedback");
            }}
          >
            回饋意見
          </a>{" "}
        </div>{" "}
        <div className="footer-copyright">
          {" "}
          Copyright © 2025 HKTV. All Rights Reserved{" "}
        </div>{" "}
        <div className="footer-social">
          {" "}
          <span>關注我們</span>{" "}
          <a href="#instagram" className="social-icon instagram"></a>{" "}
          <a href="#facebook" className="social-icon facebook"></a>{" "}
          <a href="#youtube" className="social-icon youtube"></a>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
};

function App() {
  const [cartCnt, setCartCnt] = useState<number>(0); 
  const [actFiltCat, setActFiltCat] = useState<string>(''); 
  const [srchTrm, setSrchTrm] = useState<string>(''); 
  const [animCart, setAnimCart] = useState<boolean>(false); 
  const [isTopExp, setIsTopExp] = useState<boolean>(false);
  const [sugs, setSugs] = useState<Suggestion[]>([]); 
  const [isSugsVis, setIsSugsVis] = useState<boolean>(false); 
  const srchContRef = useRef<HTMLDivElement>(null); 
  const blurTOutRef = useRef<NodeJS.Timeout | null>(null);
  const [currView, setCurrView] = useState<ViewType>('main'); 
  const [srchQPage, setSrchQPage] = useState<string>(''); const [srchRes, setSrchRes] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navToView = (view: ViewType) => { setCurrView(view); if (view === 'main') { setSrchQPage(''); setActFiltCat('酒類'); setSrchTrm(''); } else if (view === 'login' || view === 'register' || view === 'feedback' || view === 'shoppingCart') { setSrchTrm(''); setIsSugsVis(false); } };
  const onAddCart = (p: Product) => { setCartCnt(c => c + 1); setAnimCart(true); };
  useEffect(() => { if (animCart) { const t = setTimeout(() => setAnimCart(false), 600); return () => clearTimeout(t); } }, [animCart]);
  const onTogTop = () => setIsTopExp(p => !p);
  const onLogoClk = () => navToView('main');
  const onTopBannerCatClk = (catName: string) => { navToView('main'); setActFiltCat(catName); setSrchTrm(''); };
  const onMainTabChg = (tabName: string) => { navToView('main'); setActFiltCat(tabName); setSrchTrm(''); };
  const onSideCatSel = (catName: string) => { navToView('main'); setActFiltCat(catName); setSrchTrm(''); };
  const onSrchChg = (e: ChangeEvent<HTMLInputElement>) => setSrchTrm(e.target.value);
  const onSrchFoc = () => { if (srchTrm.trim()) setIsSugsVis(true); if (blurTOutRef.current) { clearTimeout(blurTOutRef.current); blurTOutRef.current = null; } };
  const onSrchBlur = () => { blurTOutRef.current = setTimeout(() => setIsSugsVis(false), 150); };

  const execSrch = (q: string, catCtx?: string) => {
    const lq = q.toLowerCase(); let res = allProductsData.filter(p => p.name.toLowerCase().includes(lq));
    if (catCtx) res = res.filter(p => p.category.toLowerCase() === catCtx.toLowerCase() || sidebarCategoriesData.find(sc => sc.includes(catCtx))?.toLowerCase() === p.category.toLowerCase());
    setSrchRes(res); setSrchQPage(q); setCurrView('searchResults'); setIsSugsVis(false);
    if (blurTOutRef.current) { clearTimeout(blurTOutRef.current); blurTOutRef.current = null; }
  };
  const onSugClk = (sug: Suggestion) => { setSrchTrm(sug.searchTerm); execSrch(sug.searchTerm, sug.categoryContext); };
  const onSrchSub = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!srchTrm.trim()) return; execSrch(srchTrm); };
  useEffect(() => {
    if (!srchTrm.trim()) {
      setSugs([]);
      return;
    }
    const h = setTimeout(() => {
      const g = generateSuggestions(
        srchTrm,
        allProductsData,
        sidebarCategoriesData
      );
      setSugs(g);
      if (document.activeElement?.classList.contains("search-input"))
        setIsSugsVis(true);
    }, 250);
    return () => clearTimeout(h);
  }, [srchTrm]);

  const onLoginSuc = () => { setIsLoggedIn(true); navToView('main'); };
  const onRegSuc = () => navToView('login');
  const prodsForMain = allProductsData
    .filter((p) => {
      if (currView !== "main" || !actFiltCat) return true;
      if (actFiltCat.includes("/")) {
        const pts = actFiltCat.split("/").map((s) => s.trim().toLowerCase());
        return pts.some((pt) => p.category.toLowerCase().includes(pt));
      }
      return p.category.toLowerCase() === actFiltCat.toLowerCase();
    })
    .filter((p) =>
      currView === "main" && srchTrm
        ? p.name.toLowerCase().includes(srchTrm.toLowerCase())
        : true
    );

  const mainTabs: string[] = ['酒類', '零食', '大特價'];
  const visActMainTab: string | null = currView === 'main' ? (mainTabs.find(t => t === actFiltCat) || null) : null;

  return (
    <div className="app-container">
      <Header
        cartItemCount={cartCnt}
        onSearchChange={onSrchChg}
        searchTerm={srchTrm}
        animateCartIcon={animCart}
        onSearchFocus={onSrchFoc}
        onSearchBlur={onSrchBlur}
        onSearchSubmit={onSrchSub}
        searchContainerRef={srchContRef}
        onLogoClick={onLogoClk}
        onNavigate={navToView}
      />
      <SearchSuggestions
        suggestions={sugs}
        isVisible={isSugsVis}
        onSuggestionClick={onSugClk}
        containerRef={srchContRef}
      />
      {currView === "main" && (
        <>
          {" "}
          <PromotionBanner slides={promotionSlidesData} />{" "}
          <TopBanner
            categories={topBannerCategoriesData}
            initialCount={NUMBER_OF_INITIAL_TOP_CATEGORIES}
            isExpanded={isTopExp}
            onToggleExpand={onTogTop}
            onCategoryClick={onTopBannerCatClk}
          />{" "}
          <main className="main-content">
            {" "}
            <Sidebar
              categories={sidebarCategoriesData}
              onCategorySelect={onSideCatSel}
            />{" "}
            <ProductSection
              products={prodsForMain}
              activeTab={visActMainTab}
              onTabChange={onMainTabChg}
              onAddToCart={onAddCart}
            />{" "}
          </main>{" "}
        </>
      )}
      {currView === "searchResults" && (
        <SearchResultsPage
          searchTermQuery={srchQPage}
          products={srchRes}
          onAddToCart={onAddCart}
        />
      )}
      {currView === "feedback" && <FeedbackPage />}
      {currView === "login" && (
        <LoginPage
          onNavigateToRegister={() => navToView("register")}
          onLoginSuccess={onLoginSuc}
        />
      )}
      {currView === "register" && (
        <RegisterPage
          onNavigateToLogin={() => navToView("login")}
          onRegisterSuccess={onRegSuc}
        />
      )}
      {currView === 'shoppingCart' && (
        <ShoppingCartPage
          cartItemCount={cartCnt}
          onSearchChange={onSrchChg}
          searchTerm={srchTrm}
          animateCartIcon={animCart}
          onSearchFocus={onSrchFoc}
          onSearchBlur={onSrchBlur}
          onSearchSubmit={onSrchSub}
          searchContainerRef={srchContRef}
          onLogoClick={onLogoClk}
          onNavigate={navToView}
        />
      )}
      <Footer onNavigate={navToView} />
    </div>
  );
}

export default App;