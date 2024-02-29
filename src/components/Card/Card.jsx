import { images } from "../Images/Images";
import styles from "./Card.module.css";

const Card = ({ card, index, isFlipped, isMatched, onCardClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onCardClick(index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.card} ${isFlipped || isMatched ? styles.flipped : ""}`}
    >
      {isFlipped || isMatched ? (
        images.map(
          (img) => card.image === img && <img src={img} alt={card.image} />
        )
      ) : (
        <div className={styles.cardBack}></div>
      )}
    </div>
  );
};

export default Card;
