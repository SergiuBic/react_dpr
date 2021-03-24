import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SignatureCanvas from 'react-signature-canvas'
import h2c from 'html2canvas'
import jsPDF from 'jspdf'
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectValue, setSelectedValue] = useState(0);
  const [signatureDone, setSignature] = useState(false);
  const [trimmedDataURL, setTrimmedData] = useState(null);
  const [textSelected, setTextSelected] = useState("");
  const [alteMotive, setAlteMotive] = useState("");
  const [mainName, setMainName] = useState("");



  let sigPad = {}
  function toggleMainName(e) {
    setMainName(e.target.value);
  }
  function toggleAlteMotive(e) {
    setAlteMotive(e.target.value);
  }
  function toggleMotive(e) {
    setSelectedValue(e.target.value);
    setTextSelected(e.target.options[e.target.selectedIndex].text)
  }
  function toggleSignature(e) {
    e.preventDefault();
    setSignature(true);
    
    setTrimmedData(sigPad.getTrimmedCanvas()
        .toDataURL('image/png'))

    e.target.classList.add("hidden")

    const input = document.getElementById('react-app');
    setTimeout(function(){

      h2c(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF( {
        unit: "in",
        format: [11, 10]
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`${mainName} - ${startDate.toLocaleString('ro-RO')} - Declaratie.pdf`); }
        );
        
    },500);

  }
  return (
    <div className="App m-0" id="react-app">
      <div className="mx-2 pa-2 text-xl text-left box-content border-1 border-gray-100 rounded-xl p-4 w-2/4">
         <h2 className="font-bold"> Declarație pe propria răspundere </h2>
         <h5 className="text-sm"> - pentru deplasarea în perioada carantinării zonale - </h5>
      </div>
  <form id="react-form" className="flex flex-col flex-nowrap m-auto justify-start w-auto mt-2 ml-4 space-y-1">

<div>
<label  htmlFor="input1" >Subsemnata/subsemnatul:</label>
<input name="input1" type="text" onKeyUp={toggleMainName} className="focus:outline-none ml-2 w-auto border-2 border-gray-200 rounded-xl p-2" />
</div>
<div>
<label  htmlFor="input2" >Născută/născut la data de:</label>
<input name="input2" type="text"  className="focus:outline-none ml-2 w-auto border-2 border-gray-200 rounded-xl p-2" />
</div>
<div>
<label  htmlFor="input3">Având domiciliul/reședința:</label>
<input name="input3" type="text"  className="focus:outline-none ml-2 w-auto border-2 border-gray-200 rounded-xl p-2" />
</div>


{signatureDone ? <div className="w-1/2"><input type='checkbox' className="mr-2" checked /><label className="text-xl bold">{textSelected}</label>{selectValue === '14' ? <div className='focus:outline-none  border-2 rounded-xl border-gray-700 mt-2 p-2 w-1/2' >{alteMotive}</div> : `-`}
</div> : <div>
<select id="react-select" name="myselect" className="focus:outline-none w-1/4 border-2 border-gray-700 rounded-xl p-2 mt-2"
  defaultValue={selectValue} 
  onChange={toggleMotive} >
<option value="0"  disabled>Alege motivul</option>
<option value="1">deplasarea în interes profesional, inclusiv între locuință, gospodărie și locul/locurile de desfășurare a activității profesionale și înapoi;</option>
<option value="2">deplasarea pentru asigurarea de bunuri care acoperă necesitățile de bază ale persoanelor și animalelor de companie/domestice, precum și bunuri necesare desfășurării activității profesionale, pentru persoanele cu vârsta de peste 65 de ani în intervalul 10:00-13:00, iar pentru persoanele cu vârsta mai mică de 65 de ani în intervalele orare 6:00-10:00, respectiv 13:00-20:00;</option>
<option value="3">deplasarea pentru asistență medicală care nu poate fi amânată și nici realizată de la distanță;</option>
<option value="4">deplasările scurte în apropierea locuinței/gospodăriei legate de activitatea fizică individuală a persoanelor (cu excluderea oricăror activități sportive de echipă), precum și pentru nevoile animalelor de companie/domestice;</option>
<option value="5">deplasarea în scopul donării de sânge la centrele de transfuzie sanguină;</option>
<option value="6">deplasarea în scop umanitar sau de voluntariat;</option>
<option value="7">deplasarea pentru realizarea de activități agricole;</option>
<option value="8">deplasarea producătorilor agricoli pentru comercializarea de produse agroalimentare;</option>
<option value="9">îngrijirea sau administrarea unei proprietăți din altă localitate și/sau eliberarea de documente necesare pentru obținerea unor drepturi;</option>
<option value="10">deplasare în vederea susținerii examenelor pentru obținerea permisului de conducere;</option>
<option value="11">participarea la programe sau proceduri în centrele de tratament;</option>
<option value="12">pentru achiziția, service-ul, efectuarea ITP sau alte operațiuni de întreținere a vehiculelor, activități care nu pot fi efectuate în localitatea de domiciliu, cu prezentarea unui document justificativ;</option>
<option value="13">alte motive justificative precum: îngrijirea/însoțirea copiilor/membrilor de familie, îngrijirea unei/unui rude/afin sau persoane aflate în întreținere, asistența persoanelor vârstnice, bolnave sau cu dizabilități ori deces al unui membru de familie;</option>
<option value="14">Alte motive legale</option>
</select>
<div>
{selectValue === '14' ? <input type="text" className='focus:outline-none  border-2 rounded-xl border-gray-700 mt-2 p-2' placeholder="Precizați motivul" onKeyUp={toggleAlteMotive}/> : `-`}
</div>
</div>}


<div>
<label htmlFor="adr">Adresa spre care se deplasează:</label>
<input name="adr" type="text"  className="focus:outline-none ml-2  border-2 border-gray-200 rounded-xl p-2" />
</div>
<div>
<label htmlFor="iorar">Intervalul orar în care se efectuează deplasarea:</label>
<input name="iorar" type="text"  className="focus:outline-none ml-2  border-2 border-gray-200 rounded-xl p-2" />
</div>
<div>
<label htmlFor="contact" className='text-sm bold'>Datele de identificare și de contact ale persoanei căreia i se acordă îngrijirea:</label>
<input name="contact" type="text"  className="focus:outline-none ml-2  border-2 border-gray-200 rounded-xl p-2" />
</div>
<div className="italic text-sm w-1/3">Subsemnata/subsemnatul cunosc prevederile art. 326 din Codul penal cu privire la falsul în declarații coroborat cu art. 352 din Codul penal referitor la zădărnicirea combaterii bolilor.</div>


<div className="footer flex flex-row flex-wrap sm:flex-nowrap justify-around  ml-8 w-1/3">
  <div className="mr-2 mb-2">Semnătura 
    
    {signatureDone ? <img className="w-auto" alt="GeneratedSignature - Declaratie"
          src={trimmedDataURL} /> : <SignatureCanvas penColor='black'
    canvasProps={{width: 200, height: 200, className: "sigCanvas border-2 border-gray-700 rounded-xl" }} ref={(ref) => { sigPad = ref }} />}
    </div>

  <div>Data <DatePicker selected={startDate} onChange={date => setStartDate(date)} className="focus:outline-none  border-2 border-gray-700 rounded-xl p-2" /></div>
</div>
      </form>

      <input type="button" id="generate" value="Generează" onClick={toggleSignature}
      className="bg-blue-200 p-3 mt-2 mb-2 m-auto flex text-center rounded-xl border-2 border-gray-500"/>
    </div>
  );
}

export default App;
