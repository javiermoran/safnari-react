import React, { useEffect } from "react";
import uuid from "uuid";
import * as d3 from "d3";
import "./BarChart.scss";

interface IBarChartProps {
  data: { value: number, label: string }[];
}

const BarChart = (props: IBarChartProps) => {
  const chartId = `chart-${uuid.v4()}`;
  const data = props.data;
  const height = 300;
  const colWidth = 50;
  const colSpace = 40;
  const drawChart = (): void => {
    const element = document.getElementById(chartId);
    !!element && (element.innerHTML = '');  
    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height);
    //Adding the bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "BarChart__column")
      .attr("x", (d, i) => i * (colWidth + colSpace))
      .attr("y", (d, i) => height - 10 * d.value)
      .attr("width", colWidth)
      .attr("height", (d, i) => d.value * 10);
    //Adding the number labels
    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => `${d.value}`)
      .attr("x", (d, i) => i * (colWidth + colSpace) + (colWidth / 4))
      .attr("y", (d, i) => height - 10 * d.value - 5);
    svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(generateXAxis());
  };
  const generateXAxis = () => {
    const axisScale = d3
      .scaleLinear()
      .domain([0, props.data.length])
      .range([0, (colWidth + colSpace) * props.data.length]);
    return d3
      .axisBottom(axisScale)
      .ticks(props.data.length)
      .tickFormat((i, d) => props.data[d] ? props.data[d].label : '');
  }
  useEffect(() => {
    if (props.data.length) {
      drawChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return <div id={chartId} className="BarChart"></div>;
};

export default BarChart;
