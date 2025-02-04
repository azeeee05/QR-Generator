import { useState } from "react"



const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("")
  const [qrSize, setQRSize] = useState("")

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.log("Error!", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img).then((response) => response.blob()).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }).catch((error) => console.error('Error downloading the QR code:', error));
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className="qr" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data For QR Code:
        </label>
        <input type='text' value={qrData} id="dataInput" placeholder="Enter Your Link for QR" onChange={(e) => setQrData(e.target.value)} />
        <label htmlFor="sizeInput" className="input-label">
          Image Size(e.g., 150):
        </label>
        <input type='text' id="dataInput" placeholder="Enter Your Image Size" onChange={(s) => setQRSize(s.target.value)} />
        <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Downnload QR Code</button>
      </div>
    </div>
  )
}

export default QrCode
