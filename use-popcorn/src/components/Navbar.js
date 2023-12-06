import React from "react";


const Navbar = ({children}) => {//props drillingin yeni componentler arasinde prop dasimagin qarsini almaq ucun
  return ( 
    <nav className="nav-bar">
     {children}
    </nav>
  );
};

export default Navbar;
