import React from 'react'

const LoaderContext = React.createContext()

function useLoaderCtxt() {
    const context = React.useContext(LoaderContext)
    if (context === undefined) {
        throw new Error('useLoaderCtxt must be used within a LoaderProvider')
    }
    return context
}
  
function LoaderProvider({children}) {
    const [isShowLoading, showLoader] = React.useState(false)
    const value = { isShowLoading, showLoader }
    return <LoaderContext.Provider value={value}>
        {children}
    </LoaderContext.Provider>
}
  
export { LoaderProvider, useLoaderCtxt }