import React, { createContext, useContext, useState } from 'react'

const PerfilContext = createContext(null)

export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(null)
  return (
    <PerfilContext.Provider value={{ perfil, setPerfil }}>
      {children}
    </PerfilContext.Provider>
  )
}

export function usePerfil() {
  const ctx = useContext(PerfilContext)
  return ctx || { perfil: 'implantador', setPerfil: () => {} }
}
