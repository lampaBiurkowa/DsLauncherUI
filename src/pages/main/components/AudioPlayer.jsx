import React, { useEffect, useState } from "react";
import * as fs from "@tauri-apps/plugin-fs";
import './AudioPlayer.scss';

const allowedAudioExtensions = ['wav', 'ogg', 'mp3'];

async function loadFiles(directoryPath) {
  const entries = await fs.readDir(directoryPath);
  return entries.map(entry => `${directoryPath}/${entry.name}`);
}

function AudioPlayer({ path, backgroundImage }) {
  const [audioTracks, setAudioTracks] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentAudioSrc, setCurrentAudioSrc] = useState('');

  useEffect(() => {
    const loadAudioFiles = async () => {
      try {
        if (!path) return;
        
        const audioFiles = await loadFiles(path);
        const filteredAudioFiles = audioFiles.filter(file =>
          allowedAudioExtensions.includes(file.split('.').pop())
        );
        const sortedAudioFiles = filteredAudioFiles.sort();
        setAudioTracks(sortedAudioFiles);
        if (sortedAudioFiles.length > 0) {
          loadAudioFile(sortedAudioFiles[0]);
        }
      } catch (error) {
        console.error('Error loading audio files:', error);
      }
    };

    loadAudioFiles();
  }, [path]);

  const loadAudioFile = async (filePath) => {
    try {
      const fileBytes = await fs.readFile(filePath);
      const fileExtension = filePath.split('.').pop();
      const mimeType = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        ogg: 'audio/ogg'
      }[fileExtension] || 'audio/mpeg';
      const blob = new Blob([new Uint8Array(fileBytes)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setCurrentAudioSrc(url);
    } catch (error) {
      console.error('Error loading audio file:', error);
    }
  };

  const playAudioTrack = async (index) => {
    setCurrentAudioIndex(index);
    loadAudioFile(audioTracks[index]);
  };

  return (
    <div className="player-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="player-title">{"a"}</h1>
      {currentAudioSrc && (
        <>
          <audio
            src={currentAudioSrc}
            controls
            onEnded={() => playAudioTrack((currentAudioIndex + 1) % audioTracks.length)}
          ></audio>
          <button onClick={() => playAudioTrack((currentAudioIndex - 1 + audioTracks.length) % audioTracks.length)}>Previous</button>
          <button onClick={() => playAudioTrack((currentAudioIndex + 1) % audioTracks.length)}>Next</button>
          <ul className="track-list">
            {audioTracks.map((track, index) => (
              <li key={index} onClick={() => playAudioTrack(index)}>
                {track.split('/').pop()}
              </li>
            ))}
          </ul>
        </>
      )}
      {!currentAudioSrc && <p>Loading...</p>}
    </div>
  );
}

export default AudioPlayer;
