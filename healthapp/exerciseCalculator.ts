interface TrainingResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  days: number[],
  target: number,
): TrainingResults => {
  const periodLength = days.length;
  const trainingDays = days.filter((day) => day !== 0).length;

  let average: number;

  if (periodLength === 0 || trainingDays === 0) {
    average = 0;
  }
  average =
    days.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
    periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = "Amazing! target achived";
  }
  if (average >= target * 0.65) {
    rating = 2;
    ratingDescription = "Not too bad but could be improved";
  } else {
    rating = 1;
    ratingDescription = "You need to take this more seriously :(";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
