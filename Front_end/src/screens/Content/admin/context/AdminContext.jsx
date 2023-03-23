import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Admin = createContext();
const getUrl = 'https://pfeboumerdes.pythonanywhere.com/deps';
const postUrl = 'https://pfeboumerdes.pythonanywhere.com/dep';
const getOneUrl = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const deleteUrl = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getDomainsUrl = 'https://pfeboumerdes.pythonanywhere.com/domains';
const postDomainUrl = 'https://pfeboumerdes.pythonanywhere.com/domain';
const deleteDomainUrl = 'https://pfeboumerdes.pythonanywhere.com/domain/';
export const AdminContext = ({children}) => {
  const [openGest,setOpenGest] = useState(false);
  const [openChef,setOpenChef] = useState(false);
  const [deps,setDeps] = useState([]);
  const [domains,setDomains] = useState([]);
  const getDeps = async () => {
    const response = await axios.get(getUrl);
    const result = await response.data;
    setDeps(result);
  }
  const addDep = async (formData) => {
    const result = await axios.post(postUrl,formData)
    console.log(result.data);
    getDeps();
  }
  const deleteDep = async (id) => {
    const response = await axios.delete(`${deleteUrl}${id}`);
    getDeps();
  }
  const getDomains = async () => {
    const response = axios.get(getDomainsUrl);
    console.log((await response).data)
    setDomains((await response).data);
  }
  const addDomain = async (formData) => {
    const result = await axios.post(postDomainUrl,formData)
    console.log(result);
    getDomains();
  }
  const deleteDomain = async () => {
    await axios.delete(`${deleteDomainUrl}2`);
    getDomains();
  }
  
  
  
  useEffect(() => {
    getDeps();
    // addDep();
    getDomains();
    // getOneDomain();
    // addDomain();
    // deleteDomain();
    // deleteDep();
    // getOneDep();
  },[])
  return (
    <Admin.Provider value={{openGest,setOpenGest,openChef,setOpenChef,deps,getDeps,addDep,getDomains,domains,addDomain,deleteDep}}>
        {children}
    </Admin.Provider>
  )
}

export const useAdmin = () => useContext(Admin);