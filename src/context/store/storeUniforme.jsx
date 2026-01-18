import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"


const getAuthHeaders = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser?.state?.token}`,
        }
    }
}

const storeUniforms = create(set=>({
    
    modal:false,
    toggleModal: (modalType) => set((state) => ({ modal: state.modal === modalType ? null : modalType })),

    
    registerUniform:async(url,data)=>{
        try {
            const respuesta = await axios.post(url, data,getAuthHeaders())
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
    },












    
    deleteUniform:async(url)=>{
        const isConfirmed  = confirm("Vas a eliminar el Uniforme ¿Estás seguro de realizar esta acción?")
        if (isConfirmed ) {
            try {
                const respuesta = await axios.delete(url,getAuthHeaders())
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.error(error)
            }
        }
    },
    payTUniforms:async(url,data)=>{
        try {   
            const respuesta = await axios.post(url,data,getAuthHeaders())
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
        
    }
}))


export default storeUniforms
