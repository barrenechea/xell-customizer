import { useEffect, useState } from "react";

const CONTRIBUTORS = [
  "[cOz]",
  "Cancerous1",
  "Ced2911",
  "GliGli",
  "Juvenal",
  "Natelx",
  "Niceshot",
  "Redline99",
  "sk1080",
  "Swizzy",
  "Tuxuser",
  "Grimdoomer",
  "InvoxiPlayGames",
  "Octal450",
  "15432",
];

const ContributorsScroller = () => {
  const [currentContributor, setCurrentContributor] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    let eraseTimeout: NodeJS.Timeout;
    let charIndex = 0;

    // Function to type the current contributor name
    const typeText = () => {
      const fullText = CONTRIBUTORS[currentContributor];

      if (charIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, charIndex));
        charIndex++;

        // Schedule next character
        typingTimeout = setTimeout(typeText, 75); // Typing speed
      } else {
        // When done typing, pause before erasing
        pauseTimeout = setTimeout(() => {
          // Start erasing
          charIndex = fullText.length;
          eraseText();
        }, 2000); // Pause with full text
      }
    };

    // Function to erase the current text
    const eraseText = () => {
      const fullText = CONTRIBUTORS[currentContributor];

      if (charIndex > 0) {
        setDisplayText(fullText.substring(0, charIndex - 1));
        charIndex--;

        // Schedule erasing next character
        eraseTimeout = setTimeout(eraseText, 30); // Erasing speed (faster than typing)
      } else {
        // When done erasing, move to next contributor
        const nextContributor = (currentContributor + 1) % CONTRIBUTORS.length;
        setCurrentContributor(nextContributor);
        charIndex = 0;
      }
    };

    // Start the typing effect
    typingTimeout = setTimeout(typeText, 100);

    // Cleanup timeouts
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(pauseTimeout);
      clearTimeout(eraseTimeout);
    };
  }, [currentContributor]);

  return (
    <div className="my-2 flex justify-center">
      <div className="flex w-full max-w-md">
        <div className="flex-1 pr-2 text-right font-medium">Thanks to:</div>
        <div className="flex-1 text-left">
          <span className="text-blue-600 dark:text-blue-400">
            {displayText}
            <span className="ml-0.5 animate-pulse font-semibold text-blue-600 dark:text-blue-400">
              _
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContributorsScroller;
