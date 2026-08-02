"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

const ModalContext = createContext();

export function ModalProvider({ children }){
    const [isLoginOpen, setLoginOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const openLogin = () => setLoginOpen(true)
    const closeLogin = () => setLoginOpen(false)

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false)
        })
    }, [])

    return (
        <ModalContext.Provider value={{ isLoginOpen, openLogin, closeLogin}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context){
        throw new Error("Error")
    }
    return context
}