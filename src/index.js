var app = angular.module('app', ['ngRoute']);
app.controller("MainCtrl", function ($scope) {
  $scope.jsonData = [];
  const dropZone = document.getElementById("drop-zone");
  dropZone.addEventListener("dragover", handleDragOver);
  dropZone.addEventListener("drop", handleFileDrop);
  //console.log(dropZone);

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
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets["Sheet1"];
      if (worksheet) {
        $scope.jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log($scope.jsonData);
      } else {
        console.error("Sheet1 not found in workbook");
      }
    };
    reader.onerror = (event) => {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    reader.readAsArrayBuffer(files[0]);
  }
});
