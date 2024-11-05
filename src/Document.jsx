import React, { useCallback, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create the DocumentViewer component
const DocumentViewer = ({ fileUrl }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the user input

  // Initialize the search plugin
  const searchPluginInstance = searchPlugin();
  
  // Extract necessary methods from the plugin instance
  const { jumpToMatch, clearHighlights, highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;

  // Handle the search action
  const handleSearch = useCallback(() => {
    clearHighlights(); // Clear previous highlights
    const matches = highlight(searchTerm); // Get matches for the current keyword
    if (matches.length > 0) {
      jumpToMatch(0); // Jump to the first match (index 0)
    } else {
      console.log('Text not found'); // Log if the text is not found
    }
  }, [highlight, jumpToMatch, clearHighlights, searchTerm]);

  // Handle the next match action
  const handleNext = useCallback(() => {
    jumpToNextMatch(); // Jump to the next match
  }, [jumpToNextMatch]);

  // Handle the previous match action
  const handlePrevious = useCallback(() => {
    jumpToPreviousMatch(); // Jump to the previous match
  }, [jumpToPreviousMatch]);

  return (
    <div style={{ height: '750px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
        placeholder="Enter search term"
        style={{ marginBottom: '10px', padding: '8px', width: '300px' }} // Styling for the input
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleNext} style={{ marginLeft: '10px' }}>Next</button>
      <button onClick={handlePrevious} style={{ marginLeft: '10px' }}>Previous</button>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer 
          fileUrl={fileUrl} 
          plugins={[searchPluginInstance]} // Register the search plugin
        />
      </Worker>
    </div>
  );
};

export default DocumentViewer;
