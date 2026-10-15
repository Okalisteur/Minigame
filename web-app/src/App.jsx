import { useState } from "react";
import Intro from "./pages/Intro";
import SwipeLesson from "./pages/SwipeLesson";
import Enquete from "./pages/Enquete";
import FouilleMIL from "./pages/FouilleMIL";
import BentoHome from "./pages/BentoHome";
import { getProgress, markDone, resetProgress } from "./lib/progress";

/**
 * Machine à états du parcours :
 * intro -> dashboard, puis le dashboard ouvre chaque méthode d'apprentissage
 * à la demande (au clic sur une des 3 cartes) et revient au dashboard une
 * fois la méthode terminée. La progression est persistée en localStorage
 * (lib/progress.js) pour que le tuto du dashboard sache quelle carte
 * mettre en valeur.
 */
export default function App() {
  const [ecran, setEcran] = useState("intro");
  const [progress, setProgress] = useState(getProgress());

  function ouvrirLecon(cle) {
    setEcran(cle);
  }

  function terminerLecon(cle) {
    setProgress(markDone(cle));
    setEcran("dashboard");
  }

  function recommencerTuto() {
    setProgress(resetProgress());
  }

  if (ecran === "intro") return <Intro onFinish={() => setEcran("dashboard")} />;
  // « Retour » / « Passer » ramènent au dashboard sans valider la méthode
  const versDashboard = () => setEcran("dashboard");

  if (ecran === "defs")
    return (
      <SwipeLesson
        onBack={versDashboard}
        onSkip={versDashboard}
        onFinish={() => terminerLecon("defs")}
      />
    );
  if (ecran === "manip")
    return <Enquete onBack={versDashboard} onFinish={() => terminerLecon("manip")} />;
  if (ecran === "fouille")
    return (
      <FouilleMIL
        onBack={versDashboard}
        onSkip={versDashboard}
        onFinish={() => terminerLecon("fouille")}
      />
    );

  return (
    <BentoHome progress={progress} onOpenLesson={ouvrirLecon} onResetTuto={recommencerTuto} />
  );
}
