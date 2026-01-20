import { useEffect, useState } from "react";
import { socket } from "../socket";
import VideoPlayer from "../components/VideoPlayer";
import Controls from "../components/Controls";
import { useParams } from "react-router-dom";

export default function Room() {
  const { roomId } = useParams();
  const [stream, setStream] = useState(null);
  const peer = new RTCPeerConnection();

  useEffect(() => {
    socket.emit("join-room", roomId);

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(currentStream => {
      setStream(currentStream);
      currentStream.getTracks().forEach(track =>
        peer.addTrack(track, currentStream)
      );
    });

    peer.onicecandidate = e => {
      if (e.candidate) {
        socket.emit("ice-candidate", e.candidate);
      }
    };

    socket.on("offer", async offer => {
      await peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("answer", answer);
    });

    socket.on("answer", answer =>
      peer.setRemoteDescription(answer)
    );

    socket.on("ice-candidate", candidate =>
      peer.addIceCandidate(candidate)
    );
  }, []);

  const toggleVideo = () =>
    stream.getVideoTracks()[0].enabled =
      !stream.getVideoTracks()[0].enabled;

  const toggleAudio = () =>
    stream.getAudioTracks()[0].enabled =
      !stream.getAudioTracks()[0].enabled;

  return (
    <>
      {stream && <VideoPlayer stream={stream} />}
      <Controls
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
      />
    </>
  );
}
