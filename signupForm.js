// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
  apiKey: "AIzaSyCJu5AFtATruWMJouaP9LB4lrbIv2tAOgY",
  authDomain: "agentes-de-excelencia.firebaseapp.com",
  databaseURL: "https://agentes-de-excelencia-default-rtdb.firebaseio.com",
  projectId: "agentes-de-excelencia",
  storageBucket: "agentes-de-excelencia.appspot.com",
  messagingSenderId: "1013460803165",
  appId: "1:1013460803165:web:f7a3a5789a2d47e816b7b4"
    
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore();

/* 
Se ha vuelto a desplegar ** firebaseConfig ** pues las diferentes versiones 
para el uso de auth y para el registro de nuevos datos se interfieren
entre sí
*/

import { showMessage } from "./showMessage.js";
//import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
//import { auth, saveRegis } from "./firebase.js";

//REGISTRO DE PERSONAL
const saveRegis = (email, nombre, apellidoPaterno, apellidoMaterno) =>
  addDoc(collection(db,"registro"), {email, nombre, apellidoPaterno, apellidoMaterno});


//ESCUCHA DE DOCUMENTO
const signUpForm = document.querySelector("#registrar");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const signup = document.getElementById("signup-form"); //ES LA FUNCIÓN QUE GENERARÁ LA VENTANA DE ELEMENTOS EN BASE DE DATOS DONDE SE HA COLCAOD ESE ID EN EL HTML
  //console.log("Contenedor:", login)
  
  //DATOS DE AUTH ==> Serán aprobados por admin
  const email = signup["signup-email"].value;
  const password = signup["signup-password"].value;
  const confirmation = signup["signup2-password"].value;


  //DATOS PARA REGISTRO
  const nombre = signup["nombre"].value;
  const apellidoPaterno = signup["apellidoPaterno"].value;
  const apellidoMaterno = signup["apellidoMaterno"].value;
  
  //REGISTRAR NUEVA INFORMACIÓN EN "REGISTRO"
  try {
    if (password === confirmation) {
      const registro = await saveRegis (email, nombre, apellidoPaterno, apellidoMaterno )
      console.log("Registrando información en la nube: " + registro)
    }
  } catch (error){
    console.log("Error registrando información", error)
  }
  

  try {
    if (password === confirmation) { //DESPUÉS DE ACEPTADO EL FORMULARIO     
      // reset the form
      signup.reset();
      // show welcome message
      showMessage("Registrado: " + nombre);

    } else {
      showMessage("Las contraseñas no coinciden", "error")
    }
    

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email no disponible", "error")

    } else if (error.code === 'auth/invalid-email') {
      showMessage("Email inválido", "error")

    } else if (error.code === 'auth/weak-password') {
      showMessage("Contraseña débil", "error")

    } else if (error.code) {
      console.log(error)
      showMessage("Algo salió mal", "error")
    }
  }

});