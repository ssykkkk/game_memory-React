import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { images } from "../Images/Images";
import styles from "./App.module.css"
import { generateCards } from "../GenerateCards/GenerateCards";

const App = () => {
  const [cards, setCards] = useState(generateCards(images));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstCard, secondCard] = flipped;
      if (cards[firstCard].image === cards[secondCard].image) {
        setMatched((prevMatched) => [
          ...prevMatched,
          cards[firstCard].id,
          cards[secondCard].id,
        ]);
        setScore((prevScore) => prevScore + 1);
        if (prevScore + 1 === cards.length / 2) { // Використано prevScore замість score
          setGameWon(true);
        }
      }
      setTimeout(() => setFlipped([]), 500);
    }
  }, [flipped, cards, score]); // Додано score до масиву залежностей

  const handleCardClick = (index) => {
    if (
      !gameWon &&
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(cards[index].id)
    ) {
      setFlipped((prevFlipped) => [...prevFlipped, index]);
    }
  };

  const restartGame = () => {
    setCards(generateCards(images));
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setGameWon(false);
  };

  return (
    <div className={styles.wrap}>
      {gameWon ? (
        <div className={styles.winMessage}>
          <p>Вітаємо! Ви виграли!</p>
          <button onClick={restartGame}>Рестарт</button>
        </div>
      ) : (
        <>
          <div className={styles.score}>Рахунок: {score}</div>
          <div className={styles.cardContainer}>
            {cards.map((card, index) => (
              <Card
                key={card.id} // Змінено key на card.id
                card={card}
                index={index}
                isFlipped={flipped.includes(index) || matched.includes(card.id)}
                isMatched={matched.includes(card.id)}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
