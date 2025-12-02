import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "../firebase/config.js"

const useUsuario = () => { //Obtener auth de firebase
    const [usuario, setUsuario] = useState(undefined)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user || null)
        })

        return () => unsubscribe()
    }, [])

    return usuario
}

export default useUsuario