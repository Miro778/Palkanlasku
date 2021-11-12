import React from 'react'
import { useState } from 'react'
import './index.css'
import { makeStyles } from '@mui/styles'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const App = () => {

  let tyovuorot = JSON.parse(localStorage.getItem("tyovuorot") || "[]")

  const [perusPalkka, setPerusPalkka] = useState(JSON.parse(localStorage.getItem("peruspalkka") || 11))
  const [iltalisa, setIltalisa] = useState(JSON.parse(localStorage.getItem("iltalisa") || 1))
  const [yolisa, setYolisa] = useState(JSON.parse(localStorage.getItem("yolisa") || 2.2))
  const [lauantailisa, setLauantailisa] = useState(JSON.parse(localStorage.getItem("lauantailisa") || 2))
  const [iltalisaAlku, setIltalisaAlku] = useState(JSON.parse(localStorage.getItem("iltalisaalku") || 18))
  const [yolisaAlku, setYolisaAlku] = useState(JSON.parse(localStorage.getItem("yolisaalku") || 22))
  const [yolisaLoppu, setYolisaLoppu] = useState(JSON.parse(localStorage.getItem("yolisaloppu") || 7))

  let palkka = 0

  function VuoroLisaysModal() {

    function getModalStyle() {
      const top = 50
      const left = 50
  
      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      }
    }
  
    const classesModal = modalStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)
    const [alkuPvm, setAlkuPvm] = useState('01/12/2021')
    const [loppuPvm, setLoppuPvm] = useState('01/12/2021')
    const [alkuKlo, setAlkuKlo] = useState('07:00')
    const [loppuKlo, setLoppuKlo] = useState('15:00')
  
    const handleOpen = () => {
      setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false)
    }
  
    const lisaaVuoro = () =>  {

      const uusiVuoro = {
        alkuPvm: alkuPvm,
        loppuPvm: loppuPvm,
        alkuKlo: alkuKlo,
        loppuKlo: loppuKlo
      }
  
      tyovuorot.push(uusiVuoro)
      localStorage.setItem("tyovuorot", JSON.stringify(tyovuorot))
    }
  
    return (
      <div>
        <Button color="primary" variant="contained" onClick={handleOpen}>+ Lisää työvuoro</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classesModal.paper}>
            <form onSubmit={lisaaVuoro}>
              <h2 id="simple-modal-title">Ilmoita työvuoron alku- ja loppuaika</h2>
              <p>Pvm muodossa pv/kk/vuosi, ja kellonajat muodossa 00:00</p>
              <div>
                <TextField label="Alkupvm"
                  id='alkuPvmField'
                  type="text"
                  value={alkuPvm}
                  name="Title"
                  size='small'
                  required={true}
                  onChange={({ target }) => setAlkuPvm(target.value)}
                />
                <span> </span>
                <TextField label="Alkaa klo:"
                  id='alkuKloField'
                  type="text"
                  value={alkuKlo}
                  name="Title"
                  size='small'
                  required={true}
                  onChange={({ target }) => setAlkuKlo(target.value)}
                />
                <br />
                <TextField label="Loppupvm"
                  id='loppuPvmField'
                  type="text"
                  value={loppuPvm}
                  name="Title"
                  size='small'
                  required={true}
                  onChange={({ target }) => setLoppuPvm(target.value)}
                />
                <span> </span>
                <TextField label="Loppuu klo:"
                  id='loppuKloField'
                  type="text"
                  value={loppuKlo}
                  name="Title"
                  size='small'
                  required={true}
                  onChange={({ target }) => setLoppuKlo(target.value)}
                />
              </div>
              <div>
                <Button variant="contained" color="primary" id='lisaaVuoro-button' type="submit">Lisää</Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    )
  }

  function VuoroLista() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pvm</TableCell>
              <TableCell>Klo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {tyovuorot.map((tyovuoro) => (
            <TableRow
              key={tyovuoro.alkuPvm}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{tyovuoro.alkuPvm}</TableCell>
              <TableCell >{tyovuoro.alkuKlo} - {tyovuoro.loppuKlo}</TableCell>
              </TableRow>
          ))}
            </TableBody>
            </Table>
    </TableContainer>
    )}

    function naytaPalkka() {
      console.log('Palkkasi on näistä vuoroista ' , palkka , '€')
    }

    const paivitaPerusPalkka = (event) => {
      setPerusPalkka(event.target.value)
      localStorage.setItem("peruspalkka", JSON.stringify(event.target.value))
    }

    const paivitaIltalisa = (event) => {
      setIltalisa(event.target.value)
      localStorage.setItem("iltalisa", JSON.stringify(event.target.value))
    }

    const paivitaYolisa = (event) => {
      setYolisa(event.target.value)
      localStorage.setItem("yolisa", JSON.stringify(event.target.value))
    }

    const paivitaLauantailisa = (event) => {
      setLauantailisa(event.target.value)
      localStorage.setItem("lauantailisa", JSON.stringify(event.target.value))
    }

    const paivitaIltalisaAlku = (event) => {
      setIltalisaAlku(event.target.value)
      localStorage.setItem("iltalisaalku", JSON.stringify(event.target.value))
    }

    const paivitaYolisaAlku = (event) => {
      setYolisaAlku(event.target.value)
      localStorage.setItem("yolisaalku", JSON.stringify(event.target.value))
    }

    const paivitaYolisaLoppu = (event) => {
      setYolisaLoppu(event.target.value)
      localStorage.setItem("yolisaloppu", JSON.stringify(event.target.value))
    }


  return (
<body id='body'>
  <div>
<h1 id='title'>Laske bruttopalkkasi</h1>
<p>Ilmoitettuasi palkkatiedot ja työvuorosi sovellus laskee minkä verran palkkaa sinun tulisi ilmotetuista työvuoroista saada. Huomioithan, että </p>
<p>tarkempia tietoja ei lisien ja peruspalkan lisäksi kysellä, eikä täten esimerkiksi ylityö- ja hälytyskorvauksia oteta mukaan laskuihin.</p>
</div>
<div>
  <h2>Palkkatiedot</h2>
  <form>
  <div id='syottokentta'>
  <label htmlFor="ppalkka">Perustuntipalkka:</label>
  <input type="text" id="ppalkka" size="1" name="perustuntipalkka" value={perusPalkka} onChange={paivitaPerusPalkka}/>
  <span>€/h</span>
  </div>
  <br />
  <div id='syottokentta'>
  <label htmlFor="ilisa">Iltalisä:</label>
  <input type="text" id="ilisa" size="1" name="iltalisa" value={iltalisa} onChange={paivitaIltalisa}/>
  <span>€/h, </span>
  <label htmlFor="ylisa">Yölisä:</label>
  <input type="text" id="ylisa" size="1" name="yolisa" value={yolisa} onChange={paivitaYolisa}/>
  <span>€/h, </span>
  <label htmlFor="llisa">Lauantailisä:</label>
  <input type="text" id="llisa" size="1" name="lauantailisa" value={lauantailisa} onChange={paivitaLauantailisa}/>
  <span>€/h</span>
  </div>
  <br />
  <div id='syottokentta'>
  <label htmlFor="ilisaAlku">Iltalisä masketaan jälkeen klo:</label>
  <input type="text" id="ilisaAlku" size="1" name="ilisaAlku" value={iltalisaAlku} onChange={paivitaIltalisaAlku}/>
  <span>: 00, </span>
  <label htmlFor="ylisaAlku">Yölisä masketaan jälkeen klo:</label>
  <input type="text" id="ylisaAlku" size="1" name="ylisaAlku" value={yolisaAlku} onChange={paivitaYolisaAlku}/>
  <span>: 00, </span>
  <label htmlFor="ylisaLoppu">Yölisä loppuu klo:</label>
  <input type="text" id="ylisaLoppu" size="1" name="ylisaLoppu" value={yolisaLoppu} onChange={paivitaYolisaLoppu}/>
  <span>: 00</span>
  </div>
  </form>
</div>
<div id='tyovuorot'>
  <h2>Työvuorot</h2>
  <VuoroLisaysModal />
  <VuoroLista />
</div>
<div>
<Button color="primary" variant="contained" onClick={naytaPalkka}>Laske paljonko saat palkkaa</Button>
</div>
</body>
  )
}

const modalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  },
}))


export default App