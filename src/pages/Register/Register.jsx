import React from 'react'
import { InputText } from '../../common/InputText/InputText'
import "./Register.css"

export const Register = () => {
  return (
    <div className='registerDesign'>
      <InputText
                className="inputBasicDesign"
                type="text"
                maxLength="30"
                name="name"
                placeholder="Escribe tu nombre"
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurValidateFunction={(e) => inputValidate(e)}
              />
    </div>
  )
}
