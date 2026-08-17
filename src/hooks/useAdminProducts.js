import { useContext } from "react";
import { AdminProductContext } from "../contexts/AdminProductContext";


export function useAdminProducts(){

  const context = useContext(AdminProductContext)

  if(!context){
    throw new Error('useAdminProducts harus digunakan di dalam AdminProductProvider')
  }

  return context
}