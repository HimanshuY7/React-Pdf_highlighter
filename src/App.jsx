import { useState } from 'react'
import DocumentViewer from './Document'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>PDF Viewer</h1>
        <DocumentViewer fileUrl="/sample.pdf" />
      </div>
    </>
  )
}

export default App
