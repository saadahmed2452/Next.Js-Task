import React from 'react'

const layout = ({children}) => {
  return (
    <div>

        <h1>THis is profile Header</h1>
        {children}
        <h2>THis is profile footer</h2>

      
    </div>
  )
}

export default layout
