import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 w-full max-w-lg mx-auto shadow-md rounded-lg px-10 py-12 my-12 bg-purple-900 text-white border-2 border-slate-900">
      <h1 className='text-white text-center mb-10 text-3xl drop-shadow-2xl'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="text-xl outline-none w-full py-1 px-3 text-gray-800"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
 
        <button 
onClick={copyPasswordToClipboard}
className="outline-none bg-yellow-500
before:ease relative overflow-hidden text-slate-900 
shadow-2xl transition-all before:absolute before:top-1/2 
before:h-0 before:w-64 before:origin-center 
before:-translate-x-20 before:rotate-45 before:bg-orange-500 
before:duration-300 hover:text-white hover:shadow-orange-500 
hover:before:h-64 hover:before:-translate-y-32 px-5 py-0.5 shrink-0">
<span className="relative z-10">COPY</span></button>
        
    </div>
    <div className='flex text-sm gap-x-4 mt-8'>
      <div className='flex items-center gap-x-2'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App
