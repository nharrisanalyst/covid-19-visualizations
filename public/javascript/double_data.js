let doubleData;
let doubleDay;
{
    function makedoubleData(){
     function makeData(dayInterval){
      const startData = {value:10, day:0};
      const lineData=[startData];
      let currentValue =10;
      for(let i = dayInterval; i <=100; i+=dayInterval){
        currentValue = currentValue * 2;
        lineData.push({value:currentValue, day:i})
      }
      return lineData;
    }

      const lineDataDouble1 = makeData(1);
      const lineDataDouble2 = makeData(2);
      const lineDataDouble3 = makeData(3);
      const lineDataDouble4 = makeData(4);
      const lineDataDouble5 = makeData(5);

     return [lineDataDouble1,lineDataDouble2,lineDataDouble3,lineDataDouble4,lineDataDouble5];
    }

    function findDoubleDay(max,interval){
          let day= 0;
          while(max>10){
            day+= interval;
            max=max/2;
          }
        return day;
    }

  doubleData = makedoubleData();
  doubleDay = findDoubleDay;
}
