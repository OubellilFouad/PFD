import React, { createContext, useContext, useState } from 'react'

const Chef = createContext();

export const ChefContext = ({children}) => {
  const [openSec,setOpenSec] = useState(false);  
  const [openGroup,setOpenGroup] = useState(false);  
  return (
    <Chef.Provider value={{openSec,setOpenSec,setOpenGroup,openGroup}}>
        {children}
    </Chef.Provider>
  )
}

export const useChef = () => useContext(Chef);