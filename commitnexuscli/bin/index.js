#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const folderPath = process.argv[2];

if (!folderPath) {
  console.error("❌ Please provide a folder path. Example:\n   npx commitnexus-uploader ./myfolder");
  process.exit(1);
}

async function uploadFolder(folderPath) {
    const remainingFiles = fs.readdirSync(folderPath);
    const formData = new FormData();
    const paths = [];
  
    let filesAdded = 0;
  
    remainingFiles.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
  
      if (stat.isFile()) {
        console.log(`📄 Adding file: ${filePath}`);
        formData.append('files', fs.createReadStream(filePath), file);
        paths.push(file);
        filesAdded++;
      } else {
        console.log(`📂 Skipping folder: ${filePath}`);
      }
    });
  
    if (filesAdded === 0) {
      console.error("❌ No valid files found in the folder.");
      return;
    }
  
    formData.append('filePaths', JSON.stringify(paths));
  
    console.log("🔄 Upload in progress...");
  
    try {
      const res = await axios.post(
        'https://commitnexusdatabase.onrender.com/api/upload',
        formData,
        { headers: formData.getHeaders() }
      );
  
      console.log("\n✅ Upload Successful!");

      console.log("📡 Server Response: ", res.data);  // Log the entire response
  
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
    }
  }
  
uploadFolder(folderPath);
