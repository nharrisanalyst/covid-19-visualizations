let DailyNewBase
{
  class DailyNewBaseClass{
    constructor(options){
      this.margin = {l:40,t:20,r:20,b:20};
      this.el = options.el;
      this.data = options.data;
      this.height = this.el.getBoundingClientRect().height - (this.margin.t+this.margin.b);
      this.width = this.el.getBoundingClientRect().width - (this.margin.l+this.margin.r);
      this.yAtt = options.yAttribute;
    }

    makeSVG(){
      this.svg = d3.select(this.el).append('svg')
                                    .attr('height', this.height +(this.margin.t+this.margin.b))
                                    .attr('width', this.width + (this.margin.l+this.margin.r))
       this.mainG = this.svg.append('g')
                        .attr('transform', `translate(${this.margin.l}, ${this.margin.t})`)
    }

   makeScales(){
      this.xScale= d3.scalePoint().domain(this.data.map(d=>d.date)).range([0,this.width]);

      const maxY = d3.max(this.data, d=>d[this.yAtt]);
      this.yScale = d3.scaleLinear().domain([0,maxY]).range([this.height,0]).nice();

      }

    makeAxis(){
      const xAxis = d3.axisBottom(this.xScale);
      const yAxis = d3.axisRight(this.yScale);

      this.mainG.append('g').attr('class', 'linear-chart-x-axis').attr('transform', `translate(0, ${this.height})`)
                                                              .call(xAxis).call(g => g.selectAll(".domain")
                                                                                      .attr("stroke-opacity", 0.5)
                                                                                      .attr("stroke-dasharray", "2,2"))

                                                              .call(g => g.selectAll(".tick line").remove());


      this.mainG.append('g').attr('class','linear-chart-y-axis').attr('transform', `translate(${0}, ${0})`)
                            .call(yAxis).call(g => g.select('.domain').remove())
                            .call(g => g.selectAll(".tick line")
                                        .attr("stroke-opacity", 0.5)
                                        .attr("stroke-dasharray", "2,2")
                                        .attr('x2', this.width))
                                        .call(g => g.selectAll(".tick text")
                                                     .attr("x", 4)
                                                     .attr("dy", -4));

    }

  }

 DailyNewBase = DailyNewBaseClass;

}
