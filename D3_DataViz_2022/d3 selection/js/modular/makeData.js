makeData = (range, n, t, xGrowth, yGrowth) => {
  const data = range(n).map(d => ({
    r: 20 + Math.sin(d * 0.5 + t * 2) * 10,
    x: d * xGrowth(n) + 50,
    y: yGrowth(2.1) + Math.sin(d * 0.5 + t) * yGrowth(2.5)
  }));
  return data;
};