import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import React from 'react'

function CustomOnChangePlugins({onChange,value}) {
  console.log('hghghg',onChange,value);
  const [editor] = useLexicalComposerContext();
  console.log('ddd',editor.getEditorState());
  
  
  return (
    <OnChangePlugin onChange={(editorState)=>{
      editorState.read(()=>$generateHtmlFromNodes(editor))
    }}/>
  )
}

export default CustomOnChangePlugins