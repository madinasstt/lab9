const width = 500
const height = 500

const drawScatterplot = () => {
  const n = 500;

  const dots = [...Array(100)].map(() => ({
    x: Math.random() * n,
    y: Math.random() * n,
  }));

  const canvas = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  canvas
    .selectAll("circle")
    .data(dots)
    .enter()
    .append("circle")
    .attr("cx", (dot) => dot.x)
    .attr("cy", (dot) => dot.y)
    .attr("r", 3)
    .attr("fill", "gray");
};
const drawPie = () => {
  d3.csv("titanic.csv").then((data) => {
    const ageCsv = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.Age
    );
    const sections = d3.pie()([...ageCsv].map(([age, count]) => {
        console.log(age);
        return count
    }));

    const canvas = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const pie = canvas.append("g").attr("transform", "translate(250,250)");

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const arcs = d3.arc().innerRadius(0).outerRadius(200);

    pie
      .selectAll("path")
      .data(sections)
      .enter()
      .append("path")
      .attr("d", arcs)
      .attr("fill", (d, i) => color(i));
  });
};

drawScatterplot()
drawPie();
