export const checkInputs = (name, data, required) => {
  switch (name) {
    case "name":
    case "surname":
    case "city":
      if (data === "" && required === true) {
        return { message: "El campo no puede estar vacío", validated: false };
      } else if (!/^[a-zA-ZáéíóúüñÑÁÉÍÓÚ ]*-?$/.test(data)) {
        return {
          message: "El valor introducido no es correcto",
          validated: false,
        };
      }
      return { message: "", validated: true };

    case "email":
      if (data === "" && required === true) {
        return { message: "El campo no puede estar vacío", validated: false };
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {
        return { message: "Formato de email inválido", validated: false };
      }
      return { message: "", validated: true };

    case "password":
      if (data === "" && required === true) {
        return { message: "El campo no puede estar vacío", validated: false };
      } else if (!/^(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,}$/.test(data)) {
        return {
          message: "Al menos 6 caracteres con una mayúscula y un número",
          validated: false,
        };
      }
      return { message: "", validated: true };

    case "phone":
      if (data === "" && required === true) {
        return { message: "El campo no puede estar vacío", validated: false };
      } else if (!/^(?:\d{9})?$/.test(data)) {
        return { message: "El formato del teléfono debe tener 9 dígitos" };
      }
      return { message: "", validated: true };

    case "age":
      if (data === "" && required === true) {
        return { message: "El campo no puede estar vacío", validated: false };
      } else if (!/^(1\d|[2-9]\d)?$/.test(data)) {
        return { message: "La edad debe estar entre 10 y 99 años" };
      }
      return { message: "", validated: true };

    default:
      console.log("Campo de entrada no reconocido");
  }
};
