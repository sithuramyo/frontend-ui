// src/loaders/loginLoader.ts
import { redirect, type LoaderFunction } from "react-router-dom"
import Cookies from "js-cookie"

export const loader: LoaderFunction = () => {
    const token = Cookies.get("token")
    if (!token) return null
    throw redirect("/home/dashboard")
}
