import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <input onChange={e => setRoom(e.target.value)} />
      <button onClick={() => navigate(`/room/${room}`)}>
        Join
      </button>
    </>
  );
}
