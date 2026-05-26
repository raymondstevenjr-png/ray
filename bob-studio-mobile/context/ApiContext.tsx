import React, { createContext, useContext, useState, useEffect } from 'react'
import { API_BASE } from '../constants/api'
import { getSavedApiUrl, saveApiUrl } from '../constants/storage'

interface ApiContextValue {
  apiBase: string
  setApiBase: (url: string) => Promise<void>
}

const ApiContext = createContext<ApiContextValue>({
  apiBase: API_BASE,
  setApiBase: async () => {},
})

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [apiBase, setApiBaseState] = useState(API_BASE)

  useEffect(() => {
    getSavedApiUrl().then(url => { if (url) setApiBaseState(url) })
  }, [])

  async function setApiBase(url: string) {
    setApiBaseState(url)
    await saveApiUrl(url)
  }

  return (
    <ApiContext.Provider value={{ apiBase, setApiBase }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApiBase = () => useContext(ApiContext)
