const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

// Input JSON file 
const inputFilePath = 'D:\\4basecare\\nirvana.json';

// Read the JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    // Parse JSON data
    const jsonData = JSON.parse(data);

    // Cleanse the data 
    jsonData.forEach(item => {
      item.name = item.name.replace(/[^\x00-\x7F]/g, '');
    });

    // Define fields to be included in the CSV
    const fields = ['name', 'language', 'id', 'bio'];

    // Create JSON to CSV parser instance with specified fields
    const parser = new Parser({ fields });

    // Convert JSON data to CSV format
    const csv = parser.parse(jsonData);

    // Extract the input file name without the extension
    const fileNameWithoutExtension = path.parse(inputFilePath).name;

    // Output CSV file path
    const outputFilePath = fileNameWithoutExtension + '.csv';

    // Write CSV data to file
    fs.writeFile(outputFilePath, csv, 'utf8', (err) => {
      if (err) {
        console.error('Error writing CSV file:', err);
        return;
      }
      console.log('CSV file generated successfully:', outputFilePath);
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
