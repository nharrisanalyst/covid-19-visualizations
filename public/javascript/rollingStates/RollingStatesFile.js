let RollingStates;


{

 class RollingStatesClass extends RollingStatesBase{


       makeLines(){
        const const line = d3.line()
                              .x(d=>this.xScale(d.date))
                              .y(d=> this.yScale(d.rollingAverage))

        const rollingData = this.data.map(d=> d3.rolling(d,7,d=>d[this.yAtt]))

        const data = this.data.map((d,i)=>(
             d = d.map((item,j)=> {
               item.rollingAverage = rollingData[i][j];
        })
      ))

      this.mainG.selectAll('.rolling-average-g')
                 .data(data)
                 .join('g')
                 .append('path')
                 .attr('d', line)
                 .attr('fill','none')
                 .attr('stroke-width', 2)
                 .attr('stroke', 'rgb(255, 3, 24)')




 }



   RollingStates =  RollingStatesClass;



}
