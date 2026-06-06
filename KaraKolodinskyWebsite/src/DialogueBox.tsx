import { useState, useEffect, useCallback, type JSX } from "react";
import "./DialogueBox.css";

const script: string[] = [
  'hello!',
  'welcome to my page!',
  'thank you for visiting!',
  '...',
  '.....',
  '...............',
  '.....are you still here?',
  'scroll down!',
  '...',
  '.....',
  "i'm serious!",
  "there's no more dialogue after this!!"
];

export default function DialogueBox(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [animKey, setAnimKey] = useState<number>(0);

  const isDone: boolean = index >= script.length;
  const currentText: string = isDone ? script[script.length - 1] : script[index];

  const advance = useCallback((): void => {
    setIndex((prev) => (prev < script.length ? prev + 1 : prev));
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.code === "Space") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [advance]);

  return (
    <div id="textarea" className="img-responsive">
      <div className="nameandsprite">
        <img
          src="/me.gif"
          id="sprite1"
          alt="me sprite"
        />
      

      <div className="textbox" onClick={advance}>
        <div className="text">
          <div className="spaceforCurrent" onClick={advance}>
            <p className="name">kara</p>
            <p
              key={animKey}
              id="currenttext"
              className="scroll"
              onClick={advance}
            >
              {currentText}
            </p>
            
          </div>
          
        </div>
        
      </div> <br></br>
      <p className="centered">click dialogue box or press space to advance text</p>
    </div></div>
  );
}