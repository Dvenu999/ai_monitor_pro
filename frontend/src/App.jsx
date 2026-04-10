import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, RefreshCcw, CheckCircle, XCircle } from 'lucide-react';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/logs/')
      .then(res => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
          <Activity size={32} color="#3b82f6" /> AI Monitor Dashboard
        </h1>
        <button onClick={fetchLogs} style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f3f4f6' }}>
            <tr>
              <th style={{ padding: '15px' }}>Model ID</th>
              <th style={{ padding: '15px' }}>Latency</th>
              <th style={{ padding: '15px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '15px', fontWeight: '500' }}>Model {log.ai_model}</td>
                <td style={{ padding: '15px' }}>{log.latency_ms} ms</td>
                <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {log.status === 'Success' ? <CheckCircle size={16} color="green" /> : <XCircle size={16} color="red" />}
                  <span style={{ color: log.status === 'Success' ? '#166534' : '#991b1b' }}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;