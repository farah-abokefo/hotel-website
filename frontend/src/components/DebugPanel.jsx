// src/components/DebugPanel.jsx
import React, { useState, useEffect } from 'react';

const DebugPanel = () => {
    const [logs, setLogs] = useState([]);
    const [testResult, setTestResult] = useState(null);

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 20));
        console.log(`[${type.toUpperCase()}]`, message);
    };

    const testBackendConnection = async () => {
        addLog('Testing backend connection...', 'info');
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'C002', password: 'cust123' })
            });
            
            const data = await response.json();
            addLog(`Response status: ${response.status}`, response.ok ? 'success' : 'error');
            addLog(`Response data: ${JSON.stringify(data)}`, response.ok ? 'success' : 'error');
            setTestResult(data);
            
            if (response.ok && data.token) {
                addLog('✅ Backend is working correctly!', 'success');
            } else {
                addLog('❌ Backend returned error', 'error');
            }
        } catch (error) {
            addLog(`❌ Connection failed: ${error.message}`, 'error');
            setTestResult({ error: error.message });
        }
    };

    const checkCORS = async () => {
        addLog('Checking CORS headers...', 'info');
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'OPTIONS',
                headers: { 'Origin': window.location.origin }
            });
            
            const corsHeaders = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            };
            
            addLog(`CORS Headers: ${JSON.stringify(corsHeaders)}`, 'info');
            if (corsHeaders['Access-Control-Allow-Origin'] === '*') {
                addLog('✅ CORS is properly configured', 'success');
            } else {
                addLog('⚠️ CORS might not be configured correctly', 'warning');
            }
        } catch (error) {
            addLog(`❌ CORS check failed: ${error.message}`, 'error');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            width: '400px',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 9999,
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            maxHeight: '400px',
            overflow: 'auto'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '10px',
                borderBottom: '1px solid #444',
                paddingBottom: '5px'
            }}>
                <strong>🔧 Debug Panel</strong>
                <div>
                    <button onClick={testBackendConnection} style={{ marginRight: '5px', padding: '2px 8px' }}>Test API</button>
                    <button onClick={checkCORS} style={{ padding: '2px 8px' }}>Check CORS</button>
                </div>
            </div>
            
            {testResult && (
                <div style={{ 
                    marginBottom: '10px', 
                    padding: '5px',
                    backgroundColor: testResult.token ? '#0a3a2a' : '#3a1a1a',
                    borderRadius: '4px'
                }}>
                    <div>Test Result: {testResult.token ? '✅ Success' : '❌ Failed'}</div>
                    {testResult.token && <div>Role: {testResult.role}</div>}
                    {testResult.error && <div>Error: {testResult.error}</div>}
                </div>
            )}
            
            <div style={{ fontSize: '10px', color: '#888', marginBottom: '5px' }}>Logs:</div>
            {logs.map((log, idx) => (
                <div key={idx} style={{ 
                    marginBottom: '2px',
                    color: log.type === 'error' ? '#f48771' : log.type === 'success' ? '#6a9955' : '#9cdcfe',
                    borderTop: idx > 0 ? '1px solid #333' : 'none',
                    paddingTop: '2px'
                }}>
                    [{log.timestamp}] {log.message}
                </div>
            ))}
        </div>
    );
};

export default DebugPanel;