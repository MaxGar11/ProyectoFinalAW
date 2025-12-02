import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { auth, db } from "./config.js"

export const onSignOut = async (navigate) => {
    await signOut(auth);
    navigate("/");
}

export const registroUsuario = (formData, setFormData) => {
    if (!formData.email || !formData.password || !formData.nombre || !formData.escuela || !formData.tipoUsuario) { 
        return setFormData({ ...formData, error: "Llena todos los campos" });
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async(result) => {
            console.log(result)
            try {
                await updateProfile(result.user, {
                    displayName: formData.nombre,
                });

                await setDoc(doc(db, "users", result.user.uid), {
                    nombre: formData.nombre,
                    escuela: formData.escuela,
                    tipoUsuario: formData.tipoUsuario,
                    email: formData.email,
                    fechaCreacion: new Date()
                });

                return result.user;

            } catch (err) {
                console.error("Error guardando datos extra:", err);
                setFormData({ ...formData, error: "Hubo un error guardando tus datos" });
            }
        })
        .catch((err) =>{
            console.log(err.message, err.code)
            setFormData({ ...formData, error: handleError(err.code, err.message) })

        } )
}

export const loginUsuario = (formData, setFormData) => {
    //console.log(formData)
    if (!formData.email || !formData.password) {
        return setFormData({ ...formData, error: "Ingresa correo y contraseña" });
    }
    signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((result) => result.user )
        .catch((err) => setFormData({ ...formData, error: handleError(err.code, err.message) }))
}

function handleError (code, message) {
    switch (code) {
        case 'auth/wrong-password':
        return 'Correo o contraseña incorrectos.'
        case 'auth/user-not-found':
        return 'No hay ningún usuario con el correo ingresado.'
        case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos.'
        case 'auth/invalid-email':
        return 'Por favor valida que el correo electrónico este escrito correctamente.'
        case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.'
        case 'auth/email-already-in-use':
        return 'la dirección de correo electrónico ya se encuentra en uso.'
        default:
        return message
    }
}

export const getInfoUsuarioActual = async () => {
    const user = auth.currentUser;
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null; //Si no existe, regresa nulo

    return { id: user.uid, ...userSnap.data() };
};

export const updateInfoUsuarioActual = async (data) => {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(db, "users", user.uid);

    if (data.nombre && data.nombre !== user.displayName){
        await updateProfile(user, {
            displayName: data.nombre,
        });
    }

    await updateDoc(ref, data);

    return true;
};

export const getInfoUsuarioPorId = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) return null; //Si no existe, regresa nulo

    return { id: uid, ...docSnap.data() };
};
