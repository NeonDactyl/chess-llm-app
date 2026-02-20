import React, { useEffect, useRef, useState } from 'react';
import { Chessground } from '@lichess-org/chessground';
import { Settings } from 'lucide-react';
import './App.css';
import '@lichess-org/chessground/assets/chessground.base.css';
import '@lichess-org/chessground/assets/chessground.brown.css';

function App() {
  const boardRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState({
    apiKey: '',
    basePrompt: '',
    chaosMode: false,
    whiteModel: 'gpt-4o',
    blackModel: 'claude-3-5-sonnet'
  });

  useEffect(() => {
    if (boardRef.current) {
      Chessground(boardRef.current, {
        movable: { free: config.chaosMode },
        // Add more chessground config here
      });
    }
  }, [config.chaosMode]);

  return (
    <div className="app-container">
      {/* 1. Analysis Bar */}
      <div className="analysis-bar">
        {/* Render vertical evaluation visual here */}
      </div>

      {/* 2. Chessboard Area */}
      <div className="board-container">
        <div ref={boardRef} className="cg-wrap" />
      </div>

      {/* 3. Right Panel */}
      <div className="right-panel">
        <div className="video-placeholder">
          <Settings 
            className="settings-icon" 
            onClick={() => setShowSettings(!showSettings)} 
            style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
          />
          {showSettings && (
            <div className="settings-dialog">
              <h3>Configuration</h3>
              <input type="password" placeholder="OpenRouter API Key" />
              <textarea placeholder="Base Prompt" />
              <label>
                <input type="checkbox" checked={config.chaosMode} 
                  onChange={e => setConfig({...config, chaosMode: e.target.checked})} />
                Chaos Mode
              </label>
              <select><option>GPT-4o</option></select>
              <select><option>Claude 3.5</option></select>
            </div>
          )}
          <span>Video Overlay Placeholder</span>
        </div>

        <div className="chat-area">
          <div className="message bot-white">White: I'll start with e4.</div>
          <div className="message bot-black">Black: Classic. Let's go with c5.</div>
        </div>
      </div>
    </div>
  );
}

export default App;
