import React, { useContext, useState, useEffect } from 'react'
import { lang } from '../utils/languages'


const LanguageContext = React.createContext()

export const LanguageProvider = ({ children }) => {
    const [term, setTerm] = useState('english')
    const [items, setItems] = useState(lang[term]);

    const changeLang = (text) => {
        localStorage.setItem('language', text);
        let temp = localStorage.getItem('language');
        setTerm(temp);
    }

    useEffect(() => {
        setItems(lang[term])
    }, [term])


    return (
        <LanguageContext.Provider value={{ items, changeLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguageContext = () => {
    return useContext(LanguageContext)
}