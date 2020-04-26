
let DailyNewChart;

{
  class DailyNewChartClass extends DailyNewBase{



    makeBars(){
      console.log('bandwidth',this.xScale.bandwidth())
      console.log(this.xScale.domain());
      console.log(this.xScale.range());
      this.mainG.selectAll('.daily-bars').data(this.data)
                                         .join('rect')
                                         .attr('height', d=> this.height - this.yScale(d[this.yAtt]))
                                         .attr('width', this.xScale.bandwidth())
                                         .attr('x', d => this.xScale(d.date))
                                         .attr('y', d => this.yScale(d[this.yAtt]))
                                         .attr('fill','rgb(191, 0, 255)')
                                         .attr('stroke', 'white')
                                         .attr('stroke-width', 1)


    }

    makeAverageLine(){
      const rollingData = d3.rolling(this.data.reverse(),7,d=>d[this.yAtt]);
      console.log('rolling-data-data',this.data);
      console.log('rolling-data',rollingData)
      const rollingDataWithDate =[];
      let index =0;
      for(let data of rollingData){
        if(isNaN(data)){
          index++;
        }else{
          rollingDataWithDate.push({value:data, date:this.data[index].date});
          index++;
        }
      }

        console.log(rollingDataWithDate)
    const line = d3.line()
                   .x(d=>(this.xScale(d.date) + (this.xScale.bandwidth()/2)))
                   .y(d=> this.yScale(d.value))

         this.mainG.append('path').datum(rollingDataWithDate)
                    .attr('d', line)
                    .attr('stroke', 'rgb(255,149,0)')
                    .attr('stroke-width', 3)
                    .attr('fill', 'none')



    }

   render(){
    this.makeSVG();
    this.makeScales();
    this.makeAxis();
    this.makeBars();
    this.makeAverageLine();
   }
   rerender(options){

   }
  }

  DailyNewChart = DailyNewChartClass;

}
