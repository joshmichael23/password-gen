import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles.scss'
function App() {
  const [count, setCount] = useState(0);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState(0);
  const range = useRef();
  const pass = useRef();
  

  const generate = (count, upper, lower, number, symbol) =>{
      let result = '';
      let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lowercase = 'abcdefghijklmnopqrstuvwxyz';
      let numbers = '0123456789';
      let symbols = '!@#$%^&*()-=[];,./';
      let characters = '';

      setSecurity(0);

      if(upper){
        characters+=uppercase;
      }

      if(lower){
        characters+=lowercase;
      }

      if(number){
        characters+=numbers;
      }

      if(symbol){
        characters+=symbols;
      }

      

      const charactersLength = characters.length;
      
      let counter = 0;
      while (counter < count) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      

      checkSecurity(password);
      return result;
  }

  const checkSecurity = (password) =>{
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(password!=password.toUpperCase()){
      setSecurity(security=>security+1);
    }

    if(password!=password.toLowerCase()){
      setSecurity(security=>security+1);
    }

    if(/\d/.test(password)){
      setSecurity(security=>security+1);
    }

    if(format.test(password)){
      setSecurity(security=>security+1);
    }

    if(password.length < 5){
      setSecurity(security=>1);
    }

    if(password.length < 8){
      setSecurity(security=>2);
    }

    if(password.length==0){
      setSecurity(0);
    }
     
  }

  const getSecurityWord =(security) =>{
    if(security==1){
      return "TOO WEAK!"
    }else if(security==2){
      return "WEAK"
    }else if(security==3){
      return "MEDIUM"
    }else if(security==4){
      return "STRONG"
    }else{
      return "";
    }
  }

  const copyPass = () =>{
    setCopied(true);
    navigator.clipboard.writeText(pass.current.value);
    setTimeout(()=>{
      setCopied(false);
    }, 2000);
  }

  function handleChangeValue(e) {
    setCount(range.current.value);
  }

  return (
    <main>
     <div className="form-container">
       <h1>Password Generator</h1>
       <form id="passForm" action="#">
        <input id="password" type="text" ref={pass} value={password} placeholder='P4$5W0rD!'/>

        <label className={copied? "show" : "hide"}>COPIED</label>
        <button><img src="./icon-copy.svg" alt="" onClick={()=>copyPass()}/></button>
       </form>
       <form action="#" className='pass-form'>
       
            <div className='length-container'>
              <p>Character Length</p>
              <p className='char-length'>{count}</p>
              <input type="range" min="0" max="20" value={count} onInput={()=>handleChangeValue()} style={{"--range": count}} ref={range}name="" id="" />
           
            </div>
       
            <label className='checkbox-container'>
              <input type="checkbox" 
                    value={upper} 
                    className={upper?'checked':''} 
                    onChange={()=>setUpper(upper=>!upper)}/>
              <span className="checkmark"></span>
              Include Uppercase Letters
              
            </label>
            <label className='checkbox-container'>
              <input type="checkbox" 
                    value={lower} 
                    className={lower?'checked':''}
                    onChange={()=>setLower(lower=>!lower)}/>
              <span className="checkmark"></span>
              Include Lowercase Letters
            </label>
            <label className='checkbox-container'>
              <input type="checkbox" 
                    value={number} 
                    className={number?'checked':''}
                    onChange={()=>setNumber(number=>!number)}/>
              <span className="checkmark"></span>
              Include Numbers
            </label>
            <label className='checkbox-container'>
              <input type="checkbox" 
                      value={symbol} 
                      className={symbol?'checked':''}
                      onChange={()=>setSymbol(symbol=>!symbol)}/>
              <span className="checkmark"></span>
              Include Symbols
            </label>
            <div className='str-container'>
                <p>STRENGTH</p>
                <div>
                  <p>{getSecurityWord(security)}</p>
       
                  <div data-str="1" className={"sec"+security}></div>
                  <div data-str="2" className={"sec"+security}></div>
                  <div data-str="3" className={"sec"+security}></div>
                  <div data-str="4" className={"sec"+security}></div>
                </div>
            </div>
            <button className='generate' onClick={()=>setPassword(generate(count, upper, lower,number,symbol))}>GENERATE</button>
       
       </form>
     </div>
    </main>
  )
}

export default App
