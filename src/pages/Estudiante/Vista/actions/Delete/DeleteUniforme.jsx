/* eslint-disable react/prop-types */
import { ToastContainer } from "react-toastify"
import storeAuth from "../../../../../context/storeAuth"

const TableUniforms = ({ uniforms }) => {
  const { rol } = storeAuth()

  return (
    <>
      <ToastContainer />

      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            <th className="p-2">N°</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Detalle</th>
            <th className="p-2">Talla</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Estado pago</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {uniforms.map((uniform, index) => (
            <tr
              className="hover:bg-gray-300 text-center"
              key={uniform.id || index}
            >
              <td>{index + 1}</td>
              <td>{uniform.nombre}</td>
              <td>{uniform.detalle}</td>
              <td>{uniform.talla}</td>
              <td>$ {uniform.precio}</td>
              <td
                className={
                  uniform.estadoPago === "Pagado"
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                }
              >
                {uniform.estadoPago}
              </td>

              <td className="py-2 text-center">
                {rol === "Estudiante" && (
                  <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
                    Registrar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TableUniforms
