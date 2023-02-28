document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
  
    // Add event listeners to the drop zone
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleFileDrop);
  });

  // Handle dragover event
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  // Handle file drop event
  function handleFileDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
    convertToJSON(files);
  }
  
  // Handle selected files
  function handleFiles(files) {
      console.log(files[0].name);
      console.log(files[0].size);
      console.log(files[0].type);
  }

  // Convert file to JSON
  function convertToJSON(files) {
    const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets['Sheet1'];
          if (worksheet) {
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            //console.log(jsonData);
            //displayData(jsonData);
            $scope.jsonData = jsonData;
          } else {
            console.error('Sheet1 not found in workbook');
          }
        };
        reader.onerror = (event) => {
          console.error('File could not be read! Code ' + event.target.error.code);
        };
        reader.readAsArrayBuffer(files[0]);
  }

  // Display data in table
  /*function displayData(jsonData) {
    const table = document.getElementById('table');
    const numRows = jsonData.length;

    for (let i = 0; i < numRows; i++) {
      const row = table.insertRow();
      const no = row.insertCell();
      const id = row.insertCell();
      const name = row.insertCell();
      const joined = row.insertCell();
      const section = row.insertCell();
      const line = row.insertCell();
      const resigned = row.insertCell();

      no.textContent = jsonData[i].no;
      id.textContent = jsonData[i]["id opt"];
      name.textContent = jsonData[i].name;
      joined.textContent = jsonData[i]["joined date"];
      section.textContent = jsonData[i].section;
      line.textContent = jsonData[i].line;
      resigned.textContent = jsonData[i]["resigned date"];
    }
  }*/