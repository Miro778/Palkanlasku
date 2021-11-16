import React from 'react'
import { useState } from 'react'
import './index.css'
import Modal from '@material-ui/core/Modal'
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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

    const [open, setOpen] = React.useState(false)
    const [alkuPvm, setAlkuPvm] = useState('01/12/2021')
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
          <Box sx={modalStyle}>
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
                <br />
                <TextField label="Alkaa klo:"
                  id='alkuKloField'
                  type="text"
                  value={alkuKlo}
                  name="Title"
                  size='small'
                  required={true}
                  onChange={({ target }) => setAlkuKlo(target.value)}
                />
                <span />
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
          </Box>
        </Modal>
      </div>
    )
  }

  function VuoroLista() {

    function poistaVuoro(vuorot, vuoro) {
      localStorage.setItem("tyovuorot", JSON.stringify(poistaTaulukosta(vuorot,vuoro)))
      window.location.reload()
    }

    function poistaTaulukosta(taulukko, poistettava) { 
    
      return taulukko.filter(function(ele){ 
          return ele !== poistettava; 
      });
  }

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
              <TableCell >
              <IconButton onClick={() => {poistaVuoro(tyovuorot,tyovuoro)}} aria-label="delete">
              <DeleteIcon />
              </IconButton>
              </TableCell>
              </TableRow>
          ))}
            </TableBody>
            </Table>
    </TableContainer>
    )}

    function naytaPalkka() {
      palkka = laskePalkka(tyovuorot)
      console.log('Palkkasi on näistä vuoroista ' , palkka , '€')
    }

    function laskePalkka(tyovuorot) {
      let palkka = 0
      for (var i = 0;i < tyovuorot.length;i++) {
          palkka = palkka + laskeVuoronPalkka(tyovuorot[i])
      }
  
    return palkka
  }

  function laskeVuoronPalkka(tyovuoro) {
    let alkuH = parseInt(tyovuoro.alkuKlo.substring(0,2))
    let alkuM = parseInt(tyovuoro.alkuKlo.substring(3,5))
    let loppuH = parseInt(tyovuoro.loppuKlo.substring(0,2))
    let loppuM = parseInt(tyovuoro.loppuKlo.substring(3,5))
    if (loppuH === 0 && loppuM === 0) loppuH = 24 // Jos vuoro loppuu klo 00:00
    if (alkuH > loppuH || (alkuH === loppuH && alkuM > loppuM)) return laskeYoVuoronPalkka(alkuH,alkuM,loppuH,loppuM, tyovuoro.alkuPvm) // Laskee palkan kun työaika jakautuu kahdelle vuorokaudelle. Eli kyseessä yövuoro.
    return laskeVuorokaudenPalkka(alkuH, alkuM, loppuH, loppuM, tyovuoro.alkuPvm) // Laskee palkan kun työaika keskittyy vain yhdelle vuorokaudelle. Eli kyseessä ei-yövuoro.
  }

  function laskeYoVuoronPalkka(alkuH,alkuM,loppuH,loppuM, Pvm) {
    let toinenPvm = getSeuraavaPvm(Pvm)
    return laskeVuorokaudenPalkka(alkuH, alkuM, 24, 0, Pvm) + laskeVuorokaudenPalkka(0, 0, loppuH, loppuM, toinenPvm)
  }

  function getSeuraavaPvm(Pvm) {
    let alkuPvmFormat = Pvm.substring(3,5) + '/' + Pvm.substring(0,2) + Pvm.substring(5)
    let pvm = new Date(alkuPvmFormat)
    let seuraavaPvm = new Date(pvm)
    seuraavaPvm.setDate(pvm.getDate() + 1)
    let seuraavaPvmString = String(seuraavaPvm.getDate()).padStart(2, '0') + '/' + String(seuraavaPvm.getMonth() + 1).padStart(2, '0') + '/' + seuraavaPvm.getFullYear()
    console.log('seuraavaPvm: ' , seuraavaPvmString)
    return seuraavaPvmString
  }

  function laskeVuorokaudenPalkka(alkuH, alkuM, loppuH, loppuM, Pvm) {
    let vuoronPituus = loppuH - alkuH + ((loppuM - alkuM) / 60)
    let alkuPvmFormat = Pvm.substring(3,5) + '/' + Pvm.substring(0,2) + Pvm.substring(5)
    let pvm = new Date(alkuPvmFormat)
     if (pvm.getDay() === 0 ) return vuoronPituus * perusPalkka * 2 + laskeIltalisa(alkuH, alkuM, loppuH, loppuM) * 2 + laskeYolisa(alkuH, alkuM, loppuH, loppuM) * 2
     if (pvm.getDay() === 6 ) return vuoronPituus * perusPalkka + vuoronPituus * lauantailisa + laskeIltalisa(alkuH, alkuM, loppuH, loppuM) + laskeYolisa(alkuH, alkuM, loppuH, loppuM)
    return vuoronPituus * perusPalkka + laskeIltalisa(alkuH, alkuM, loppuH, loppuM) + laskeYolisa(alkuH, alkuM, loppuH, loppuM)
  }

  function laskeIltalisa(alkuH, alkuM, loppuH, loppuM) {
    if (loppuH <= iltalisaAlku || alkuH >= yolisaAlku) return 0 // Vuoro loppuu ennen iltalisän alkua TAI vuoro alkaa iltalisän loppumisen jälkeen -> Vuorosta ei saa iltalisää
    let iltalisanPituus = Math.min((loppuH + loppuM / 60),yolisaAlku) - Math.max(iltalisaAlku, (alkuH + alkuM / 60))
    return iltalisanPituus * iltalisa
  }

  function laskeYolisa(alkuH, alkuM, loppuH, loppuM) {
    if (loppuH < yolisaAlku && alkuH > yolisaLoppu) return 0 // Vuoro loppuu ennen yölisän alkua JA alkaa yölisän loppumisen jälkeen -> Vuorosta ei saa yölisää
    let yolisanPituus = 0
    if (loppuH > yolisaAlku) yolisanPituus = Math.min((loppuH + loppuM / 60), 24) - Math.max(yolisaAlku, (alkuH + alkuM / 60))
    if (alkuH < yolisaLoppu) yolisanPituus = Math.min((loppuH + loppuM / 60), yolisaLoppu) - (alkuH + alkuM / 60)
    return yolisanPituus * yolisa
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


export default App