{

  function rolling(values,inter, valueof){
          const rollingArray =[];
          if(valueof === undefined){
          let index = 0;
           for( const value of values){
             if(index < inter -1){
               rollingArray.push(NaN)
               index++;
             }else{
               let sum = 0;
               let j = index;
               while(j> index-inter){
                  sum += values[j];
                   j--;
               }
                const average = sum/inter;
                rollingArray.push(average);
                index++;
             }
           }
          }else{
            let index = 0;
             for( const value of values){
               if(index < inter -1){
                 rollingArray.push(NaN)
                 index++;
               }else{
                 let sum = 0;
                 let j = index;
                 while(j> index-inter){
                    sum += valueof(values[j]);
                     j--;
                 }
                  const average = sum/inter;
                  rollingArray.push(average);
                  index++;
               }
             }
          }
          return rollingArray;
        }

    d3.rolling = rolling;
}
