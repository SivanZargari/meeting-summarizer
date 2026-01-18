import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      alert("אנא בחר קובץ MP3 או WAV קודם :)");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/process-meeting', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("שגיאה בעיבוד הקובץ. ודא שהשרת (Python) דלוק.");
    } finally {
      setLoading(false);
    }
  };

  const downloadWord = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/download-word', result, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Meeting_Summary.docx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("שגיאה בהורדת הקובץ");
    }
  };

  return (
    <div style={{ direction: 'rtl', padding: '40px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}> מערכת תמלול וסיכום פגישות🎙️</h1>
      
      <div style={{ border: '2px dashed #3498db', padding: '30px', textAlign: 'center', borderRadius: '15px', backgroundColor: '#f7f9fc' }}>
        <input type="file" accept="audio/*" onChange={onFileChange} style={{ marginBottom: '20px' }} />
        <br />
        <button 
          onClick={onUpload} 
          disabled={loading}
          style={{
            padding: '10px 25px',
            fontSize: '16px',
            backgroundColor: loading ? '#bdc3c7' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "מעבד... (תמלול מקומי לוקח זמן)" : "התחל עיבוד AI"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2980b9' }}> סיכום חכם📋:</h2>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{result.summary}</div>
            
            {/* כפתור הורדת הוורד מופיע רק כשיש תוצאה */}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={downloadWord} 
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            backgroundColor: '#e67e22',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(230, 126, 34, 0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          הורד סיכום כקובץ Word 📄
        </button>
      </div>

            <hr style={{ margin: '30px 0' }} />
            
            <h3 style={{ color: '#7f8c8d' }}> תמלול מלא📝:</h3>
            <p style={{ fontSize: '14px', color: '#34495e' }}>{result.transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;