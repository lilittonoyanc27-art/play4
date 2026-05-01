export interface TimeQuest {
  time: string; // "10:30"
  correct: string; // "Son las diez y media"
  options: string[];
}

export const TIME_QUESTS: TimeQuest[] = [
  { time: "01:00", correct: "Es la una", options: ["Es la una", "Son las una", "Son la una", "Es las una"] },
  { time: "02:00", correct: "Son las dos", options: ["Son las dos", "Es la dos", "Son las dos y cuarto", "Son las una"] },
  { time: "03:15", correct: "Son las tres y cuarto", options: ["Son las tres y cuarto", "Son las tres y quince", "Son las tres menos cuarto", "Es la tres y cuarto"] },
  { time: "04:30", correct: "Son las cuatro y media", options: ["Son las cuatro y media", "Son las cuatro y treinta", "Es la cuatro y media", "Son las cinco y media"] },
  { time: "05:45", correct: "Son las seis menos cuarto", options: ["Son las seis menos cuarto", "Son las cinco y cuarenta y cinco", "Son las cinco y cuarto", "Son las seis y cuarto"] },
  { time: "12:00", correct: "Son las doce", options: ["Son las doce", "Es la doce", "Son las once", "Son las doce y media"] },
  { time: "01:30", correct: "Es la una y media", options: ["Es la una y media", "Son las una y media", "Es la una y treinta", "Son las dos y media"] },
  { time: "07:15", correct: "Son las siete y cuarto", options: ["Son las siete y cuarto", "Son las siete y quince", "Son las ocho menos cuarto", "Son las siete menos cuarto"] },
  { time: "08:45", correct: "Son las nueve menos cuarto", options: ["Son las nueve menos cuarto", "Son las ocho y cuarenta y cinco", "Son las ocho y cuarto", "Son las nueve y cuarto"] },
  { time: "10:10", correct: "Son las diez y diez", options: ["Son las diez y diez", "Son las diez menos diez", "Es la diez y diez", "Son las once y diez"] },
  { time: "11:50", correct: "Son las doce menos diez", options: ["Son las doce menos diez", "Son las once y cincuenta", "Son las doce y diez", "Es las doce menos diez"] },
  { time: "06:20", correct: "Son las seis y veinte", options: ["Son las seis y veinte", "Son las seis menos veinte", "Son las siete y veinte", "Es la seis y veinte"] },
  { time: "09:40", correct: "Son las diez menos veinte", options: ["Son las diez menos veinte", "Son las nueve y cuarenta", "Son las nueve menos veinte", "Son las diez y veinte"] },
  { time: "12:15", correct: "Son las doce y cuarto", options: ["Son las doce y cuarto", "Son las doce y quince", "Son las doce menos cuarto", "Es la una menos cuarto"] },
  { time: "01:15", correct: "Es la una y cuarto", options: ["Es la una y cuarto", "Son las una y cuarto", "Es la una y quince", "Son las dos menos cuarto"] },
  { time: "03:55", correct: "Son las cuatro menos cinco", options: ["Son las cuatro menos cinco", "Son las tres y cincuenta y cinco", "Son las tres menos cinco", "Son las cuatro y cinco"] },
  { time: "05:05", correct: "Son las cinco y cinco", options: ["Son las cinco y cinco", "Son las cinco menos cinco", "Es la cinco y cinco", "Son las seis y cinco"] },
  { time: "08:25", correct: "Son las ocho y veinticinco", options: ["Son las ocho y veinticinco", "Son las ocho menos veinticinco", "Son las nueve y veinticinco", "Son las siete y veinticinco"] },
  { time: "11:30", correct: "Son las once y media", options: ["Son las once y media", "Son las once y treinta", "Son las diez y media", "Es la once y media"] },
  { time: "02:45", correct: "Son las tres menos cuarto", options: ["Son las tres menos cuarto", "Son las dos y cuarenta y cinco", "Son las dos y cuarto", "Son las tres y cuarto"] }
];
