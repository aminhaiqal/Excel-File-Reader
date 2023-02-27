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
  }
  
  // Handle selected files
  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      // Do something with each file, for example:
      console.log(files[i].name);
      console.log(files[i].size);
      console.log(files[i].type);
    }
  }
  