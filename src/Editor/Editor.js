// import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import exampleTheme from '../themes/ExampleTheme';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import ListMaxIndentLevelPlugin from '../plugins/ListmaxIndexPlugin';
import { TRANSFORMERS } from "@lexical/markdown";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// Placeholder component for the editor
function Placeholder({placeholder}) {
  return <div className='editor-placeholder'>{placeholder} ...</div>;
}

// A custom plugin to extract HTML content from the editor
function HtmlExtractorPlugin({ onHtmlChange }) {
  const [editor] = useLexicalComposerContext(); // Access the Lexical editor instance

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor); // Convert editor content to HTML
        if (onHtmlChange) {
          onHtmlChange(htmlString); // Call the callback with the HTML string
        }
      });
    });

    return () => {
      unregisterListener(); // Clean up the listener when the component unmounts
    };
  }, [editor, onHtmlChange]);

  return null;
}

// Main editor component
function Editor({ value, onChange, placeholder, name,onHtmlChange }) {
  // State to store the HTML content extracted from the editor
  const [htmlContent, setHtmlContent] = useState('');

  const editorConfig = {
    namespace: name, // Editor's unique namespace
    theme: exampleTheme, // Custom theme for the editor
    onError(error) {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='editor-container'>
        <ToolbarPlugin /> {/* Plugin for editor toolbar */}
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />} // Where the user writes content
            placeholder={<Placeholder placeholder={placeholder} />} // Placeholder for the editor
            ErrorBoundary={LexicalErrorBoundary} // Error boundary for the editor
          />
          <HistoryPlugin /> {/* Undo/redo history plugin */}
          <AutoFocusPlugin /> {/* Automatically focuses the editor */}
      {/* CustomOnChangePlugins is not required done in this page only  remove the plugin if needed */}
          <HtmlExtractorPlugin onHtmlChange={(newHtmlContent) => {
            setHtmlContent(newHtmlContent);
            onHtmlChange(newHtmlContent);
          }} />  {/* Custom plugin to extract HTML */}
          <ListPlugin /> {/* Plugin for list functionality */}
          <LinkPlugin /> {/* Plugin for link functionality */}
          <ListMaxIndentLevelPlugin maxDepth={7} /> {/* Plugin to restrict list depth */}
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> {/* Markdown support */}
        </div>
      </div>

      {/* Display the extracted HTML content */}
      {/* <div className="html-output"> */}
        {/* <h3>Editor Content (HTML):</h3> */}
        {/* <pre>{htmlContent}</pre> */}
         {/* Render the extracted HTML content */}
  
      {/* </div> */}
    </LexicalComposer>
  );
}

export default Editor;
