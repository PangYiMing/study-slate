import './App.css';
import {useState,useEffect} from 'react'
import {getString, insertText} from './insertText'
window.root =[{ type: 'p', children: [{ text: '' }] }]
function App() {
  // const [root, setRoot] = useState(initRoot)
  useEffect(() => {
    const input = document.getElementById('editor');
    
    input.addEventListener('beforeinput', updateValue);
    function updateValue(e) {
      e.preventDefault()
      e.stopPropagation()
      insertText(window.root, e.data, [0,0])
      console.log(e.data, window.root)
      
      input.textContent = getString(window.root)
      
    }

  }, [])
  return (
    <div className="App">
      这是一个demo编辑器
      <div id='editor' contentEditable onInput={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        console.log(e)
        return
        }}>


     </div>
    </div>
  );
}

export default App;
