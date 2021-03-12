import { useState } from 'react'
import './Acordeon.css'
//envolvi todo en un div para contener al h2 que quité de home.


function Acordeon({ children, title }) {
  const [visible, setVisible] = useState(false)
  
      return (
          
          <div className="acordeon imagen">
              <h2 className="third title">{title}</h2>
              <div className="acordeon buttons">
                  <button className="buttons style" onClick={() => setVisible(!visible)}>si quieres trabajar en cwk</button>
                  {visible &&
                      <div className="expand">
                          {children}
                          
                      </div>
                  }
          
              </div>
          </div>    
      )
  }
  
  
  export default Acordeon;