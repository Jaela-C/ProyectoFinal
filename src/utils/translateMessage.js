const translateMessage = (message) => {
    const messages = {
      "auth/invalid-email": "La dirección de correo electrónico no es válida",
      "auth/email-already-in-use":
        "Ya existe una cuenta con el correo electrónico, ingrese una dirección de correo diferente",
      "auth/wrong-password":
        "La contraseña es incorrecta",
      "auth/too-many-requests":
        "Espere un momento y vuelva a intentarlo",
      "auth/user-not-found": "No existe una cuenta con el correo electrónico ingresado",
      "auth/user-disabled": "Su cuenta ha sido deshabilitada",
    };
  
    return messages[message] || message;
  };
  
  export default translateMessage;