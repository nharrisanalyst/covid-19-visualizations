let DailyNewBase
{
  class DailyNewBaseClass{
    constructor(options){
      this.margin = {l:10,t:20,r:20,b:20};
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
      this.xScale= d3.scaleBand().domain(this.data.map(d=>d.date).reverse()).range([0,this.width]).paddingInner(0.1);

      const maxY = d3.max(this.data, d=>d[this.yAtt]);
      this.yScale = d3.scaleLinear().domain([0,maxY]).range([this.height,0]).nice();

      }

    makeAxis(){
      const t =d3.transition(500);
      const xAxis = d3.axisBottom(this.xScale).tickFormat((d,i) => i%7===0 || i === this.data.length-1 && i !=this.data.length-2 && i !=this.data.length-3 && i !=this.data.length-4?`${String(d).slice(4,6)}/${String(d).slice(6,8)}`:'');
      const yAxis = d3.axisRight(this.yScale);

      this.mainG.append('g').attr('class', 'linear-chart-x-axis').attr('transform', `translate(0, ${this.height})`).transition(t)
                                                              .call(xAxis).call(g => g.selectAll(".domain")
                                                                                      .attr("stroke-opacity", 0.5)
                                                                                      .attr("stroke-dasharray", "2,2"))

                                                              .call(g => g.selectAll(".tick line").remove());


      this.mainG.append('g').attr('class','linear-chart-y-axis').attr('transform', `translate(${0}, ${0})`).transition(t)
                            .call(yAxis).call(g => g.select('.domain').remove())
                            .call(g => g.selectAll(".tick line")
                                        .attr("stroke-opacity", 0.5)
                                        .attr("stroke-dasharray", "2,2")
                                        .attr('x2', this.width))
                                        .call(g => g.selectAll(".tick text")
                                                     .attr("x", 4)
                                                     .attr("dy", -4));

    }

    upateAxis(){
      const t =d3.transition(500);
      const xAxis = d3.axisBottom(this.xScale).tickFormat((d,i) => i%7===0 || i === this.data.length-1 && i !=this.data.length-2 && i !=this.data.length-3 && i !=this.data.length-4?`${String(d).slice(4,6)}/${String(d).slice(6,8)}`:'');
      const yAxis = d3.axisRight(this.yScale);

      this.mainG.select('.linear-chart-x-axis').transition(t)
                                                              .call(xAxis).call(g => g.selectAll(".domain")
                                                                                      .attr("stroke-opacity", 0.5)
                                                                                      .attr("stroke-dasharray", "2,2"))

                                                              .call(g => g.selectAll(".tick line").remove());


      this.mainG.select('.linear-chart-y-axis').attr('transform', `translate(${0}, ${0})`).transition(t)
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
