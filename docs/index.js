var app = angular.module('app', ['ngRoute']);
app.controller("MainCtrl", function ($scope) {
  $scope.jsonData = [];
  const dropZone = document.getElementById("drop-zone");

  dropZone.addEventListener("dragover", handleDragOver);
  dropZone.addEventListener("drop", handleFileDrop);

  // Singleton
  function singleton() {
    if ($scope.jsonData.length > 0) {
      clear();
    }
  }

  // Handle dragover event
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Handle file drop event
  function handleFileDrop(event) {
    singleton();
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
        const json = XLSX.utils.sheet_to_json(worksheet);
        iterator(json);
      } else {
        console.error("Sheet1 not found in workbook");
      }
    };
    reader.onerror = (event) => {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    reader.readAsArrayBuffer(files[0]);
  }

  // Json-Date converter
  function convertDate(date) {
    const jsDate = XLSX.SSF.parse_date_code(date);
    const convertedDate = new Date(jsDate.y, jsDate.m - 1, jsDate.d);
    const dateString = convertedDate.toISOString();
    const dateWithoutTime = dateString.substring(0, 10);
    
    return dateWithoutTime;
  }

  // json Iterator
  function iterator(json) {
    for (let i = 0; i < json.length; i++) {
      $scope.jsonData.push(json[i]);
      $scope.jsonData[i]["joined date"] = convertDate(json[i]["joined date"]);
      $scope.jsonData[i]["resigned date"] = convertDate(json[i]["resigned date"]);
    }
    $scope.$apply();
  }

  // Clear json data
  function clear() {
    $scope.jsonData = [];
    $scope.$apply();
  }
});
