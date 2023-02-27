document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
  
    // Add event listeners to the drop zone
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleFileDrop);
    dropZone.addEventListener('change', readFile);
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
  }
  
  // Handle selected files
  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      // Do something with each file, for example:
      console.log(files[i].name);
      console.log(files[i].size);
      console.log(files[i].type);
      alert("File Name: " + files[i].name + '\n' + "File Type: " + files[i].size);
    }
  }

  function readFile(file) {
    const table = document.getElementById('table');
    
    readXlsxFile(file).then((rows) => {
        // Clear the table
        table.innerHTML = '';

        // Add the rows to the table
        rows.forEach((row) => {
            const tr = document.createElement('tr');
            row.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    });
  }

  // Action: Read XLXS file
  /*const input = document.getElementById('file-input');
    const table = document.getElementById('table');
 
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
 
        readXlsxFile(file).then((rows) => {
            // Clear the table
            table.innerHTML = '';
 
            // Add the rows to the table
            rows.forEach((row) => {
                const tr = document.createElement('tr');
                row.forEach((cell) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
        });
    });*/
  