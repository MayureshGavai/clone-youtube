import { createContext, useEffect, useState } from "react";
import { fetchData } from "../utils/api";

export const Context = createContext()

export const ContextProvider = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('New')
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(()=>{
        fetchDataByCategory(selectedCategory)       
    },[selectedCategory])
 
    const fetchDataByCategory = async (query) => {
        setLoading(true)
        fetchData(`search?part=snippet,id&q=${query}&maxResults=50`).then(({items})=>{
            console.log(items)
            setSearchResult(items)
            setLoading(false)
        })
    }

    return <Context.Provider
        value={{
            loading,
            setLoading,
            searchResult,
            setSearchResult,
            selectedCategory,
            setSelectedCategory,
            mobileMenu,
            setMobileMenu
        }}
    >
        {children}
    </Context.Provider>
}