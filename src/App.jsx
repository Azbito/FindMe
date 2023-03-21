import axios from 'axios'
import { useState } from 'react'
import './styles.scss'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import 'animate.css'
import place from './assets/place.png'

export const App = () => {
  const [localization, setLocalization] = useState(null)
  const [postalCode, setPostalCode] = useState('')

  async function getCEP() {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${postalCode}/json/`
    )
    setLocalization(data)
  }

  return (
    <div className="container">
      <div className="logo">
        <span>
          FindMe!
          <img src={place} alt="local" />
        </span>
      </div>
      <div className="input-box">
        <input
          type="text"
          required="required"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
        />
        <span>Digite o CEP</span>
      </div>
      <Box m={3} display="flex" justifyContent="center" alignItems="center">
        <Button
          style={{
            borderRadius: 30,
            backgroundColor: '#21b6ae',
            fontSize: '1rem'
          }}
          variant="contained"
          onClick={getCEP}
        >
          Buscar
        </Button>
      </Box>
      {localization && (
        <div className="animate__animated animate__fadeInUp">
          <p>O CEP é de </p>
          <strong>
            {localization.localidade}, {localization.uf}
          </strong>
        </div>
      )}
    </div>
  )
}
