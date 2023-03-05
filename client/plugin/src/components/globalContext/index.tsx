import React from 'react'

export interface GlobalContextType {
  open: [value: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>]
}

const globalContext = React.createContext<GlobalContextType>(null as any)

export const GlobalContextProvider = (props: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(true)
  return (
    <globalContext.Provider
      value={{
        open: [open, setOpen]
      }}
    >
      {props.children}
    </globalContext.Provider>
  )
}

export default globalContext
