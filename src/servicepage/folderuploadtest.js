import React from "react";
import axios from "axios";

function App() {
  async function handleFolderUpload(event) {
    const files = event.target.files;
    if (!files.length) return alert("❌ No files selected");

    const formData = new FormData();
    const filePaths = [];

    for (let file of files) {
      console.log("📁 File path:", file.webkitRelativePath);
      filePaths.push(file.webkitRelativePath);
      formData.append("files", file, file.webkitRelativePath);
    }

    // ✅ Send filePaths array as a JSON string
    formData.append("filePaths", JSON.stringify(filePaths));

    try {
      const res = await axios.post("http://localhost:3000/api/upload-folder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Upload Success:", res.data);
      alert("✅ Folder uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert("❌ Upload failed!");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 Upload Folder</h2>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFolderUpload}
      />
    </div>
  );
}

export default App;
