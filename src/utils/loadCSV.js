import Papa from "papaparse";

export const loadCSV = async () => {
  const response = await fetch("/data/superstore.csv");
  const csvText = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
    });
  });
};