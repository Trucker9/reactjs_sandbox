import React from "react";

// for autocompletion purposes
const cardContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (item) => {},
});

export default cardContext;