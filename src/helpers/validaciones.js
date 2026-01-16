

// permite solo números
export const soloNumeros = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

//permitir solo letras
export const soloLetras = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
};



export const validacionCedula = {
    required: "La cédula es obligatoria",
    pattern: {
        value: /^[0-9]{10}$/,
        message: "La cédula debe tener exactamente 10 dígitos"
    },
    minLength: {
        value: 10,
        message: "La cédula debe tener 10 dígitos"
    }
};

// Validación personalizada para teléfono
export const validacionTelefono = {
    required: "El teléfono es obligatorio",
    
    minLength: {
        value: 10,
        message: "El teléfono debe tener 10 dígitos"
    }
};


export const validacionNombre = {
    required: "El nombre es obligatorio",
    minLength: {
        value: 3,
        message: "Debe tener al menos 3 letras"
    }
    
};

export const validacionApellido={
    required:'El apellido es obligatorio',
    minLength:{
        value:3,
        message:'debe tener al menos 3 letras'
    }
}

export const validacionDireccion={
    required:'Direccion es obligatorio',
    minLength:{
        value: 4,
        message:"Debe tener al menos 4 caracteres"
    }
}

export const validacionPassword = {
    required: "La contraseña es obligatoria",
    minLength: {
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres"
    },
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)"
    }
};

// Validación para confirmar contraseña
export const validacionConfirmarPassword = (password) => ({
    required: "Debes confirmar la contraseña",
    validate: (value) => value === password || "Las contraseñas no coinciden"
});


