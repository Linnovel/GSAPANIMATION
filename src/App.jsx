// App.jsx
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef();
  const [xPos, setXPos] = useState(100); // Estado que cambia la posición

  // useGSAP se vuelve a ejecutar cada vez que xPos cambia
  useGSAP(
    () => {
      gsap.to(".box", { x: xPos, duration: 1 });
    },
    { scope: container, dependencies: [xPos], revertOnUpdate: true }
  );

  return (
    <>
      <h1>GSAP con useState</h1>
      <div ref={container} className="container">
        <div
          className="box"
          style={{ width: 100, height: 100, background: "skyblue" }}
        >
          Animación
        </div>
      </div>
      <button onClick={() => setXPos((prev) => prev + 100)}>Mover +100</button>
    </>
  );
}

export default App;
