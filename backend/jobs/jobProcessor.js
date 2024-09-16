const path = require('path');
const fs = require('fs');
const parseExcelFile = require('../utils/excelParser');
const { doctor } = require('../models'); // Assuming you have a User model

async function jobProcessor(job) {
  const { filePath } = job.data;

  try {
    // Read and parse the Excel file
    const data = parseExcelFile(filePath);

    // Validate and insert each record
    for (const record of data) {
        await doctor.create(record);
    }

    // Clean up the file after processing
    fs.unlinkSync(filePath);

    console.log(`Job ${job.id} processed successfully.`);
  } catch (error) {
    console.error('Error processing job:', job.id, error);
    throw error; // Re-throw to allow Bull to handle retries if configured
  }
}

module.exports = jobProcessor;
