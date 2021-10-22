import React from 'react'
import { useState } from 'react'
import './index.css'

const App = () => {

  let palkka = 0
  let tyovuorot = []

  const [perusPalkka, setPerusPalkka] = useState(11.0)
  const [iltalisa, setIltalisa] = useState(1.0)
  const [yolisa, setYolisa] = useState(2.2)
  const [lauantailisa, setLauantailisa] = useState(2.0)
  const [iltalisaAlku, setIltalisaAlku] = useState(18)
  const [yolisaAlku, setYolisaAlku] = useState(22)
  const [yolisaLoppu, setYolisaLoppu] = useState(7)


  return (
<body id='body'>
  <div>
<h1 id='title'>Laske palkkasi</h1>
<p>Ilmoitettuasi palkkatiedot ja työvuorosi sovellus laskee minkä verran palkkaa sinun tulisi ilmotetuista työvuoroista saada. Huomioithan, että </p>
<p>tarkempia tietoja ei lisien ja peruspalkan lisäksi kysellä, eikä täten esimerkiksi ylityö- ja hälytyskorvauksia oteta mukaan laskuihin.</p>
</div>
<div>
  <h2>Palkkatiedot</h2>
  <form>
  <div id='syottokentta'>
  <label for="ppalkka">Perustuntipalkka:</label>
  <input type="text" id="ppalkka" size="1" name="perustuntipalkka" value={perusPalkka} onChange={({ target }) => setPerusPalkka(target.value)}/>
  <span>€/h</span>
  </div>
  <br />
  <div id='syottokentta'>
  <label for="ilisa">Iltalisä:</label>
  <input type="text" id="ilisa" size="1" name="iltalisa" value={iltalisa} onChange={({ target }) => setIltalisa(target.value)}/>
  <span>€/h, </span>
  <label for="ylisa">Yölisä:</label>
  <input type="text" id="ylisa" size="1" name="yolisa" value={yolisa} onChange={({ target }) => setYolisa(target.value)}/>
  <span>€/h, </span>
  <label for="llisa">Lauantailisä:</label>
  <input type="text" id="llisa" size="1" name="lauantailisa" value={lauantailisa} onChange={({ target }) => setLauantailisa(target.value)}/>
  <span>€/h</span>
  </div>
  <br />
  <div id='syottokentta'>
  <label for="ilisaAlku">Iltalisä masketaan jälkeen klo:</label>
  <input type="text" id="ilisaAlku" size="1" name="ilisaAlku" value={iltalisaAlku} onChange={({ target }) => setIltalisaAlku(target.value)}/>
  <span>: 00, </span>
  <label for="ylisaAlku">Yölisä masketaan jälkeen klo:</label>
  <input type="text" id="ylisaAlku" size="1" name="ylisaAlku" value={yolisaAlku} onChange={({ target }) => setYolisaAlku(target.value)}/>
  <span>: 00, </span>
  <label for="ylisaLoppu">Yölisä loppuu klo:</label>
  <input type="text" id="ylisaLoppu" size="1" name="ylisaLoppu" value={yolisaLoppu} onChange={({ target }) => setYolisaLoppu(target.value)}/>
  <span>: 00</span>
  </div>
  </form>
</div>
</body>
  )
}

export default App