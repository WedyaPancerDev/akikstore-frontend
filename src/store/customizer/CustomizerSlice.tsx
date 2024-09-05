import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  activeDir?: string | any;
  activeMode?: string;
  activeTheme?: string;
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  isLayout?: string;
  isSidebarHover?: boolean;
  isMobileSidebar?: boolean;
  isHorizontal?: boolean;
  isLanguage?: string;
  isCardShadow?: boolean;
  borderRadius?: number | any;
}

const initialState: StateType = {
  activeDir: "ltr",
  activeMode: "light", // This can be light or dark
  activeTheme: "BLUE_THEME", // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: "boxed", // This can be full or boxed
  isCollapse: false, // to make sidebar Mini by default
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: "en",
  isCardShadow: true,
  borderRadius: 7,
};

export const CustomizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setTheme: (state: StateType, action) => {
      return {
        ...state,
        activeTheme: action.payload,
      };
    },
    setDarkMode: (state: StateType, action) => {
      return {
        ...state,
        activeMode: action.payload,
      };
    },

    setDir: (state: StateType, action) => {
      return {
        ...state,
        activeDir: action.payload,
      };
    },
    setLanguage: (state: StateType, action) => {
      return {
        ...state,
        isLanguage: action.payload,
      };
    },
    setCardShadow: (state: StateType, action) => {
      return {
        ...state,
        isCardShadow: action.payload,
      };
    },
    setToggleSidebar: (state: StateType, action) => {
      return {
        ...state,
        isCollapse: action.payload,
      };
    },
    setToggleMobileSidebar: (state: StateType, action) => {
      return {
        ...state,
        isMobileSidebar: action.payload,
      };
    },
    hoverSidebar: (state: StateType, action) => {
      return {
        ...state,
        isSidebarHover: action.payload,
      };
    },
    toggleLayout: (state: StateType, action) => {
      return {
        ...state,
        isLayout: action.payload,
      };
    },
    toggleHorizontal: (state: StateType, action) => {
      return {
        ...state,
        isHorizontal: action.payload,
      };
    },
    setBorderRadius: (state: StateType, action) => {
      return {
        ...state,
        borderRadius: action.payload,
      };
    },
  },
});

export const {
  setTheme,
  setDarkMode,
  setDir,
  hoverSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setToggleMobileSidebar,
  setToggleSidebar,
  setLanguage,
  setCardShadow,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
