const baseUrl = "http://localhost:3001/api/diagnoses";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch diagnoses");
  }
  return response.json();
};

export default { getAll };
