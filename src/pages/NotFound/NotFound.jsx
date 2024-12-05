import React, { useState, useEffect, useRef } from 'react';
import Message from '../../components/Message/Message';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameContent, setGameContent] = useState(''); // Para almacenar el HTML cargado
  const audioRef = useRef(null);
  const iframeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();

        if (!showInstruction) {
          setShowInstruction(true);
        }

        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play();
        }

        setTimeout(() => {
          setShowIframe(true);
        }, 10);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showInstruction]);

  useEffect(() => {
    if (showIframe && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [showIframe]);

  useEffect(() => {
    // Cargar el contenido de game.html usando fetch
    fetch('/game.html')
      .then((response) => response.text())
      .then((data) => {
        setGameContent(data); // Almacenar el contenido del archivo
      })
      .catch((error) => console.error('Error al cargar game.html:', error));
  }, []);

  const toggleMute = () => {
    setIsMuted((prevMute) => !prevMute);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }

    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  };

  return (
    <div
      className="not-found"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <div className={`formNavigate orange`} onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m14 7l-5 5l5 5"
          />
        </svg>
        <h4>Back to home</h4>
      </div>
      <Message
        message={"Ups! I couldn't find the page you are looking for"}
        recommendation={"Why don't take some SPACE to find a new kind of experience?"}
      />

      <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }} />

      {showInstruction && (
        <div
          style={{
            color: 'gray',
            fontSize: '18px',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Press SPACE to start and jump
          <button
            onClick={toggleMute}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              verticalAlign: 'middle',
              marginLeft: '10px',
            }}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
              </svg>
            )}
          </button>
        </div>
      )}

      <audio ref={audioRef} loop src="/capisong.mp3" preload="auto"></audio>

      {showIframe && (
        <div style={{ width: '100%', height: 'calc(100vh - 120px)', marginTop: '20px' }}>
          <iframe
            ref={iframeRef}
            srcDoc={gameContent}  // Usar srcDoc para insertar el contenido HTML cargado
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            loading="lazy"
            style={{
              border: 'none',
              zIndex: 0,
            }}
            tabIndex="-1"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default NotFound;
