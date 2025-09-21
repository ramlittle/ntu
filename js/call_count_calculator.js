

function exportToExcel() {
  const table = document.getElementById('table-data');
  const tableHTML = table.outerHTML;
  const fileName = 'call_count_report.xls';
  const dataType = 'application/vnd.ms-excel';

  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    // For IE
    const blob = new Blob(['\ufeff', tableHTML], { type: dataType });
    navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    // For other browsers
    downloadLink.href = 'data:' + dataType + ', ' + encodeURIComponent(tableHTML);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
}

function fillTableResult(result) {
  const tBodyData = document.querySelector("#tbody-data");
  for (let i = 0; i < result.length; i++) {
    const rowData = `<tr>
      <td>${result[i].date}</td>
      <td>${result[i].contacted_by}</td>
      <td>${result[i].number_contacted}</td>
      <td>${result[i].number_of_times}</td>
    </tr>
    `;
    tBodyData.insertAdjacentHTML('beforeend', rowData);
  }
}

function calculate() {
  let records = [];
  const jsonContent = document.querySelector('#json-content');
  const calculateButton = document.querySelector('#calculate-button');
  const pleaseWaitMessage = document.querySelector('#please-wait-message');
  calculateButton.style.display = "none";
  pleaseWaitMessage.style.display = "block";
  records = JSON.parse(jsonContent.value);
  let initialResult = [];
  let perDateResult = [];

  let objectToInsert = {
    date: "",
    contacted_by: "",
    number_contacted: "",
    number_of_times: ""
  };
  for (let i = 0; i < records.length; i++) {
    const dateToCheck = records[i].date_time.split(' ')[0];
    const contactedBy = records[i].from;
    const numberToCheck = records[i].to;
    let counter = 0;

    for (let j = 0; j < records.length; j++) {
      if (records[j].date_time.split(' ')[0] === dateToCheck) {
        if (records[j].to === numberToCheck) {
          counter++;
        }
      }
    }
    let newRecord = {
      ...objectToInsert,
      date: dateToCheck,
      contacted_by: contactedBy,
      number_contacted: numberToCheck,
      number_of_times: counter
    };
    initialResult.push(newRecord);
  }
  console.log('initial result', initialResult)
  for (let i = 0; i < initialResult.length; i++) {
    let dateToCompare = initialResult[i].date;
    let numberToCompare = initialResult[i].number_contacted;
    let counter = 0;
    for (let j = 0; j < perDateResult.length; j++) {
      if (perDateResult[j].date === dateToCompare &&
        perDateResult[j].number_contacted === numberToCompare) {
        counter++;
      }
    }
    if (counter > 0) {
      continue;
    } else {
      perDateResult.push(initialResult[i]);
    }
  }
  console.log('perDateResult', perDateResult);
  fillTableResult(perDateResult);
}