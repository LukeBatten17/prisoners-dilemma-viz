import StickmanIdle from "../assets/icons/StickmanIdle";
import StickmanDefect from "../assets/icons/StickmanDefect";
import StickmanCoperate from "../assets/icons/StickmanCoperate";

type StickmanProps = {
  displayMove: string | null;
  delay: number;
};

const Stickman: React.FC<StickmanProps> = ({ displayMove, delay }) => {
  const transitionSpeed = Math.max(150, delay * 0.6);

  return (
    <div
      className="transition-transform ease-in-out"
      style={{
        transitionDuration: `${transitionSpeed}ms`,
      }}
    >
      {displayMove === "C" ? (
        <StickmanCoperate />
      ) : displayMove === "D" ? (
        <StickmanDefect />
      ) : (
        <StickmanIdle />
      )}
    </div>
  );
};

export default Stickman;
