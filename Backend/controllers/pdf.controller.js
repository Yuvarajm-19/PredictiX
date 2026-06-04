import { spawn } from "child_process";
import path from "path";
import fs from "fs";

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("PDF deleted successfully");
  }
}

export const heartScraper = (req, res) => {
  const pdfPath = path.resolve("uploads", req.file.filename);

  const heartScript = path.resolve(
    "DataScrapingScripts",
    "scrapHeart.py"
  );

  console.log("Heart Script:", heartScript);
  console.log("PDF Path:", pdfPath);

  const pythonProcess = spawn("python", [
    heartScript,
    pdfPath,
  ]);

  let output = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOutput += data.toString();
    console.error("PYTHON ERROR:", data.toString());
  });

  pythonProcess.on("close", (code) => {
  console.log(`Heart script exited with code ${code}`);

  console.log("===== PYTHON STDOUT =====");
  console.log(output);

  console.log("===== PYTHON STDERR =====");
  console.log(errorOutput);

    if (code !== 0) {
      deleteFile(pdfPath);

      return res.status(500).json({
        success: false,
        error: errorOutput,
      });
    }

    try {
      const lines = output.trim().split("\n");

      const jsonLine = lines[lines.length - 1];

      const extractedData = JSON.parse(jsonLine);

      deleteFile(pdfPath);

      return res.json(extractedData);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log("Python Output:");
      console.log(output);

      deleteFile(pdfPath);

      return res.status(500).json({
        success: false,
        message: "Invalid JSON returned by Python",
      });
    }
  });
};

export const diabetesScraper = (req, res) => {
  const pdfPath = path.resolve("uploads", req.file.filename);

  const diabetesScript = path.resolve(
    "DataScrapingScripts",
    "scrapDiabetes.py"
  );

  console.log("Diabetes Script:", diabetesScript);
  console.log("PDF Path:", pdfPath);

  const pythonProcess = spawn("python", [
    diabetesScript,
    pdfPath,
  ]);

  let output = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOutput += data.toString();
    console.error("PYTHON ERROR:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    console.log(`Diabetes script exited with code ${code}`);

    if (code !== 0) {
      deleteFile(pdfPath);

      return res.status(500).json({
        success: false,
        error: errorOutput,
      });
    }

    try {
      const lines = output.trim().split("\n");

      const jsonLine = lines[lines.length - 1];

      const extractedData = JSON.parse(jsonLine);

      deleteFile(pdfPath);

      return res.json(extractedData);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log(output);

      deleteFile(pdfPath);

      return res.status(500).json({
        success: false,
        message: "Invalid JSON returned by Python",
      });
    }
  });
};