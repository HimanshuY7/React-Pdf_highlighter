import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

const DocumentViewer = ({ fileUrl }) => {
    // Initialize plugins
    const zoomPluginInstance = zoomPlugin();
    const { zoomTo } = zoomPluginInstance; // Access zoomTo function
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToPage } = pageNavigationPluginInstance;

    // State for current page, total pages, and zoom level
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1); // Start with 100% zoom (1.0)

    // Handle zoom in
    const handleZoomIn = () => {
        const newZoomLevel = zoomLevel + 0.2; // Increase zoom by 20%
        setZoomLevel(newZoomLevel);
        zoomTo(newZoomLevel);
    };

    // Handle zoom out
    const handleZoomOut = () => {
        const newZoomLevel = Math.max(zoomLevel - 0.2, 0.5); // Decrease zoom by 20%, minimum 50%
        setZoomLevel(newZoomLevel);
        zoomTo(newZoomLevel);
    };

    // Handle page change
    const handlePageChange = (e) => {
        const page = parseInt(e.target.value, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            jumpToPage(page - 1); // Adjust for 0-based index
        }
    };

    // Handle document load to get total pages
    const handleDocumentLoad = (e) => {
        setTotalPages(e.doc.numPages);
    };

    return (
        <div style={{ height: '750px', border: '1px solid rgba(0, 0, 0, 0.3)', padding: '10px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Custom Zoom Buttons */}
                    <button onClick={handleZoomOut} style={{ marginRight: '10px' }}>Zoom Out</button>
                    <button onClick={handleZoomIn} style={{ marginRight: '10px' }}>Zoom In</button>

                    {/* Page Navigation */}
                    <label>
                        Page:
                        <input
                            type="number"
                            value={currentPage}
                            onChange={handlePageChange}
                            style={{ width: '50px', marginLeft: '5px', marginRight: '5px' }}
                        />
                        <span>of {totalPages}</span>
                    </label>
                </div>
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[zoomPluginInstance, pageNavigationPluginInstance]}
                    onPageChange={(e) => setCurrentPage(e.currentPage + 1)} // Adjust for 1-based page number
                    onDocumentLoad={handleDocumentLoad}
                />
            </Worker>
        </div>
    );
};

export default DocumentViewer;
