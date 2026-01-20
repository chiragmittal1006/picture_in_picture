import { useRef } from "react";

export default function VideoPlayer({ stream }) {
  const videoRef = useRef();

  if (videoRef.current && stream) {
    videoRef.current.srcObject = stream;
  }

  const enablePiP = async () => {
    if (!document.pictureInPictureElement) {
      await videoRef.current.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <button onClick={enablePiP}>
        Picture in Picture
      </button>
    </>
  );
}
