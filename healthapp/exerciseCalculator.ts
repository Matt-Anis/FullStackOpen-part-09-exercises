interface TrainingResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ParsingResults {
  days: number[];
  target: number;
}

const parseArguments = (args: string[]): ParsingResults => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const days = args.slice(2, -1).map((day) => {
    if (isNaN(Number(day))) {
      throw new Error("Provided values were not numbers!");
    }
    return Number(day);
  });

  const target = Number(args[args.length - 1]);

  if (isNaN(target)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    days,
    target,
  };
};

export const calculateExercises = (
  days: number[],
  target: number,
): TrainingResults => {
  const periodLength = days.length;
  const trainingDays = days.filter((day) => day !== 0).length;

  let average: number;

  if (periodLength === 0 || trainingDays === 0) {
    average = 0;
  } else {
    average =
      days.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      ) / periodLength;
  }
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = "Amazing! target achived";
  } else if (average >= target * 0.65) {
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

try {
  const { days, target } = parseArguments(process.argv);

  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = "something went wrong ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
