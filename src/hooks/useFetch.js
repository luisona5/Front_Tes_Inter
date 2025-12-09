import axios from "/node_modules/.vite/deps/axios.js?v=84e5091d"
import { toast } from "/node_modules/.vite/deps/react-toastify.js?v=84e5091d"

export function useFetch() {
    const fetchDataBackend = async (url, data = null, method = "GET", headers = {}) => {
        const loadingToast = toast.loading("Procesando solicitud...")
        try {
            const options = {
                method,
                url,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                data
            }
            const response = await axios(options)
            toast.dismiss(loadingToast)
            
            if (response?.data?.msg) {
                toast.success(response.data.msg)
            }
            
            return response.data

        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error(error.response?.data?.msg)
            
            throw error 
        }
    }
    return fetchDataBackend
}