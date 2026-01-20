export default function Controls({ toggleVideo, toggleAudio }) {
  return (
    <div>
      <button onClick={toggleVideo}>Toggle Camera</button>
      <button onClick={toggleAudio}>Toggle Mic</button>
    </div>
  );
}
