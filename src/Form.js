import React, { useState } from 'react'
import Editor from './Editor/Editor'

function Form() {

  const [htmlContent, setHtmlContent] = useState('');
    const handleHtmlChange = (newHtmlContent) => {
      setHtmlContent(newHtmlContent);
    }
    
  return (
    <div>
        <Editor name='myHtmlEditor' 
       onHtmlChange={handleHtmlChange}
        placeholder='Enter some text'
        />
         <button
        onClick={() => console.log('HTML Content:', htmlContent)}
      >
        Save
      </button>
    </div>
  )
}

export default Form