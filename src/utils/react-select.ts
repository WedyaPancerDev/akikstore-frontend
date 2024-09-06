export const getCustomStyle = (error: any): any => {
  const customStyle = {
    menu: (provided: object) => ({
      ...provided,
      zIndex: 24,
    }),
    option: (provided: object) => ({
      ...provided,
      cursor: "pointer",
      fontFamily: "Onest",
      fontSize: 14,
    }),
    control: (provided: object) => ({
      ...provided,
      fontFamily: "Onest",
      border: error ? "2px solid #FF5569" : "2px solid #D8D8D8",
      "&:hover": {
        border: error ? "2px solid #FF5569" : "2px solid #D8D8D8",
      },
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      borderRadius: 10,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 6,
      paddingRight: 6,
    }),
    singleValue: (provided: object) => ({
      ...provided,
      color: "#334155",
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: "#999",
    }),
  };
  return customStyle;
};
