function calculate() {
  let records = [];
  let initialResult = [];
  let perDateResult = [];
  fetch('../data/calls.json')
    .then(response => response.json())
    .then(data => {
      records = data;
      // console.log('records', records);
      let objectToInsert = {
        date: "",
        contacted_by: "",
        number_contacted: "",
        number_of_times: ""
      };
      for (let i = 0; i < records.length; i++) {
        const dateToCheck = records[i].date_time.split(' ')[0];
        const contactedBy = records[i].contacted_by;
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
      console.log('initial result',initialResult)
      for(let i=0;i<initialResult.length;i++){
        let dateToCompare = initialResult[i].date;
        let numberToCompare = initialResult[i].number_contacted;
        let counter = 0;
        for(let j=0;j<perDateResult.length;j++){
          if(perDateResult[j].date === dateToCompare && 
            perDateResult[j].number_contacted === numberToCompare){
            counter++;
          }
        }
        if(counter > 0){
          continue;
        }else{
          perDateResult.push(initialResult[i]);
        }
      }
      console.log('perDateResult',perDateResult);
    })
    .catch(error => console.error('Error:', error));  

}