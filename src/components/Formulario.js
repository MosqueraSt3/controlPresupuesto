import React, { useState } from "react"
import PropTypes from 'prop-types'
import uid from 'shortid'
import Error from './Error'

const Formulario = ( {guardarGasto,guardarCrearGasto} ) => {

    const [nombre,guardarNombre] = useState('')
    const [cantidad,guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)

    // NUevo Gasto
    const agregarGasto = e => {
        e.preventDefault()

        // Validar
        if (cantidad < 1 || isNaN(cantidad)  || nombre.trim === '') {
            return guardarError(true)
        }
        guardarError(false)

        // Construir el Gasto
        const gasto = {
            nombre,
            cantidad,
            id: uid.generate()
        }

        // Pasar el gasto a Main
        guardarGasto(gasto)
        guardarCrearGasto(true)

        // Resetear
        guardarNombre('')
        guardarCantidad(0)
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agregar Gastos</h2>

            { error ? <Error 
                mensaje="Campos Incorrectos"
            /> : null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value,10))}
                />
            </div>

            <input 
                    type="submit"
                    className="button-primary u-full-width"
                    placeholder="Agregar Gasto"
                />
        </form>
    )
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto:PropTypes.func.isRequired
}

export default Formulario