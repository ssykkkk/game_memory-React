
export const generateCards = (images) => {
    const cards = [];
    for (let i = 0; i < images.length; i++) {
      cards.push({ id: i * 2, image: images[i] });
      cards.push({ id: i * 2 + 1, image: images[i] });
    }
    return shuffleArray(cards);
  };
  
  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  