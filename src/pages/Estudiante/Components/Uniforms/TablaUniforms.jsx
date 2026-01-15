/* eslint-disable react/prop-types */
import { MdDeleteForever, MdAttachMoney  } from "react-icons/md"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
import { ToastContainer } from 'react-toastify'

import storeUniforms from "../../../../context/store/storeUniforme"
import storeAuth from "../../../../context/storeAuth"
import ModalPayment from "./ModalPayment"


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const TableUniforms = ({uniforms,listUniforms}) => {

    const { rol } = storeAuth()
    const { deleteUniforms } = storeUniforms()
    const { modal,toggleModal } = storeUniforms()
    const [selectedTreatment,setSelectedTreatment] = useState(null)


    const handleDelete = async (id) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/uniforme/eliminar/${id}`
        deleteUniforms(url)
        listUniforms()
    }

    return (

        <>
            <ToastContainer/>
            
            <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            
                <thead className='bg-gray-800 text-slate-400'>
                    <tr>
                        <th className='p-2'>N°</th>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Detalle</th>
                        <th className='p-2'>Prioridad</th>
                        <th className='p-2'>Precio</th>
                        <th className='p-2'>Estado pago</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
            
                <tbody>
                    {
                        treatments.map((treatment, index) => (
                            <tr className="hover:bg-gray-300 text-center" key={treatment.id || index}>
                                <td>{index + 1}</td>
                                <td>{treatment.nombre}</td>
                                <td>{treatment.detalle}</td>
                                <td>{treatment.prioridad}</td>
                                <td>$ {treatment.precio}</td>
                                <td className={treatment.estadoPago === 'Pagado' ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>{treatment.estadoPago}</td>
                                
                                <td className='py-2 text-center'>

                                {rol === "paciente" && (
                                    <MdAttachMoney
                                        className={
                                            treatment.estadoPago === "Pagado"
                                            ? "h-7 w-7 text-gray-500 pointer-events-none inline-block mr-2"
                                            : "h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                        }
                                        title="Pagar"
                                        onClick={() => {
                                            setSelectedTreatment(treatment)
                                            toggleModal("payment")
                                        }}
                                    />
                                )}

                                {
                                    rol==="estudiante" && 
                                    (
                                        <MdDeleteForever
                                            className={treatment.estadoPago==="Pagado" ? "h-8 w-8 text-gray-500 pointer-events-none inline-block" :"h-8 w-8 text-red-900 cursor-pointer inline-block hover:text-red-600"}
                                            title="Eliminar" onClick={() => { handleDelete(treatment._id) }} />
                                    )
                                }
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            {modal === "payment" && selectedTreatment && (
                <Elements stripe={stripePromise}>
                    <ModalPayment treatment={selectedTreatment} />
                </Elements>
            )}
        
        </>

    )
}

export default TableUniforms