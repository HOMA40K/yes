document.addEventListener('DOMContentLoaded', () => {
    const instrumentLibrary = document.getElementById('instrument-library');
    const trackContainer = document.getElementById('track-container');
    const addTrackButton = document.getElementById('add-track');
    const downloadButton = document.getElementById('download');

    let trackCount = 0;
    let tracks = [];

    // List of instruments with MP3 file paths
    const instruments = [
        { id: 'flute-C4', name: 'Flute C4', mp3: 'instruments/flute-C4.mp3' },
        { id: 'flute-C5', name: 'Flute C5', mp3: 'instruments/flute-C5.mp3' },
        { id: 'flute-C6', name: 'Flute C6', mp3: 'instruments/flute-C6.mp3' },
        { id: 'flute-G4', name: 'Flute G4', mp3: 'instruments/flute-G4.mp3' },
        { id: 'flute-G5', name: 'Flute G5', mp3: 'instruments/flute-G5.mp3' },
        { id: 'flute-G6', name: 'Flute G6', mp3: 'instruments/flute-G6.mp3' },
        { id: 'piano-C4', name: 'Piano C4', mp3: 'instruments/piano-C4.mp3' },
        { id: 'piano-C5', name: 'Piano C5', mp3: 'instruments/piano-C5.mp3' },
        { id: 'piano-C6', name: 'Piano C6', mp3: 'instruments/piano-C6.mp3' },
        { id: 'piano-G3', name: 'Piano G3', mp3: 'instruments/piano-G3.mp3' },
        { id: 'piano-G4', name: 'Piano G4', mp3: 'instruments/piano-G4.mp3' },
        { id: 'piano-G5', name: 'Piano G5', mp3: 'instruments/piano-G5.mp3' },
        { id: 'piano-G6', name: 'Piano G6', mp3: 'instruments/piano-G6.mp3' },
        { id: 'trumpet-C4', name: 'Trumpet C4', mp3: 'instruments/trumpet-C4.mp3' },
        { id: 'trumpet-C5', name: 'Trumpet C5', mp3: 'instruments/trumpet-C5.mp3' },
        { id: 'trumpet-C6', name: 'Trumpet C6', mp3: 'instruments/trumpet-C6.mp3' },
        { id: 'trumpet-G3', name: 'Trumpet G3', mp3: 'instruments/trumpet-G3.mp3' },
        { id: 'trumpet-G4', name: 'Trumpet G4', mp3: 'instruments/trumpet-G4.mp3' },
        { id: 'trumpet-G5', name: 'Trumpet G5', mp3: 'instruments/trumpet-G5.mp3' },
        { id: 'violin-C4', name: 'Violin C4', mp3: 'instruments/violin-C4.mp3' },
        { id: 'violin-C5', name: 'Violin C5', mp3: 'instruments/violin-C5.mp3' },
        { id: 'violin-C6', name: 'Violin C6', mp3: 'instruments/violin-C6.mp3' },
        { id: 'violin-G4', name: 'Violin G4', mp3: 'instruments/violin-G4.mp3' },
        { id: 'violin-G5', name: 'Violin G5', mp3: 'instruments/violin-G5.mp3' },
        { id: 'violin-G6', name: 'Violin G6', mp3: 'instruments/violin-G6.mp3' },
    ];

    // Populate the instrument library
    instruments.forEach(instrument => {
        const instrumentItem = document.createElement('div');
        instrumentItem.className = 'instrument-item';
        instrumentItem.id = instrument.id;
        instrumentItem.draggable = true;
        instrumentItem.innerHTML = `
            <span>${instrument.name}</span>
            <audio src="${instrument.mp3}" preload="auto"></audio>
        `;
        instrumentLibrary.appendChild(instrumentItem);

        instrumentItem.addEventListener('dragstart', (ev) => {
            ev.dataTransfer.setData("text", ev.target.id);
        });
    });

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const instrumentItem = document.getElementById(data);
        ev.target.appendChild(instrumentItem);

        const placeholder = ev.target.querySelector('.placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        // Add delete button only when the instrument is on a track
        if (!instrumentItem.querySelector('.delete-instrument')) {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-instrument';
            deleteButton.innerText = 'Delete';
            instrumentItem.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                instrumentItem.remove();
                if (ev.target.children.length === 0) {
                    const newPlaceholder = document.createElement('div');
                    newPlaceholder.className = 'placeholder';
                    newPlaceholder.innerText = 'Drop instruments here';
                    ev.target.appendChild(newPlaceholder);
                }
            });
        }

        // Ensure the audio element is playable
        const audioElement = instrumentItem.querySelector('audio');
        audioElement.load(); // Load the audio source
        audioElement.addEventListener('canplaythrough', () => {
            console.log('Audio is ready to play');
        });
        audioElement.addEventListener('error', (e) => {
            console.error('Error loading audio:', e);
            alert('Failed to load audio. Please check the file path and try again.');
        });
    }

    addTrackButton.addEventListener('click', () => {
        const track = document.createElement('div');
        track.className = 'track';
        track.dataset.trackId = trackCount++;
        track.innerHTML = `
            <div class="track-header">
                <span>Track ${tracks.length + 1}</span>
                <input type="range" class="volume-control" min="0" max="100" value="50">
                <button class="delete-track">Delete Track</button>
            </div>
            <div class="track-body" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div class="placeholder">Drop instruments here</div>
            </div>
        `;
        trackContainer.appendChild(track);
        tracks.push(track);

        track.querySelector('.delete-track').addEventListener('click', () => {
            track.remove();
            tracks = tracks.filter(t => t !== track);
        });

        track.querySelector('.volume-control').addEventListener('input', (ev) => {
            const volume = ev.target.value;
            const audioElements = track.querySelectorAll('audio');
            audioElements.forEach(audio => {
                audio.volume = volume / 100;
            });
        });
    });

    downloadButton.addEventListener('click', () => {
        alert('Download functionality is not implemented yet.');
    });
});