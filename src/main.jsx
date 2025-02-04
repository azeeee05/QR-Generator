import React from 'react'
import ReactDom from "react-dom/client";
import QrCode from "./QrCode.jsx"
import "./QrCode.css"


ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QrCode />
  </React.StrictMode>,
)
