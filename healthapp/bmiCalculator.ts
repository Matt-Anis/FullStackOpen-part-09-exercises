interface Metrics {
  height: number;
  weigth: number;
}

interface Results {
  height: number;
  weight: number;
  bmi: string;
}

const parseArguments = (args: string[]): Metrics => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weigth: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): Results => {
  if (!height || !weight) {
    throw new Error("unvalid params");
  }

  const bmi = weight / ((height / 100) ^ 2);

  const result = {
    height,
    weight,
  };

  if (bmi < 16) {
    return { ...result, bmi: "Underweight (Severe thinness)" };
  } else if (bmi < 17) {
    return { ...result, bmi: "Underweight (Moderate thinness)" };
  } else if (bmi < 18.5) {
    return { ...result, bmi: "Underweight (Mild thinness)" };
  } else if (bmi < 25) {
    return { ...result, bmi: "Normal range" };
  } else if (bmi < 30) {
    return { ...result, bmi: "Overweight (Pre-obese)" };
  } else if (bmi < 35) {
    return { ...result, bmi: "Obese (Class I)" };
  } else if (bmi < 40) {
    return { ...result, bmi: "Obese (Class II)" };
  } else {
    return { ...result, bmi: "Obese (Class III)" };
  }
};

try {
  const { weigth, height } = parseArguments(process.argv);
  console.log(calculateBmi(height, weigth));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
