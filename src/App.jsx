import { useRef } from "react";
import gsap from "gsap";
// @ts-ignore si usas TypeScript
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

export default function App() {
  const container = useRef(null);
  const title = useRef(null);
  const splitRef = useRef(null);

  // Animación al montar
  useGSAP(
    () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }

      const split = new SplitText(title.current, { type: "chars" });
      splitRef.current = split;

      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
          duration: 1.2,
        }
      );
    },
    { scope: container }
  );

  // Animación al hacer clic
  const { contextSafe } = useGSAP({ scope: container });

  const replay = contextSafe(() => {
    if (splitRef.current) {
      splitRef.current.revert();
    }

    const split = new SplitText(title.current, { type: "chars" });
    splitRef.current = split;

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        duration: 1.2,
      }
    );
  });

  return (
    <div ref={container} style={{ padding: "2rem" }}>
      <h1 ref={title}>Animación con SplitText</h1>
      <button onClick={replay}>Repetir animación</button>
    </div>
  );
}
