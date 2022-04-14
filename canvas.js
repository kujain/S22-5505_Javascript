
var data = [
  {name: "Name 1", count: 1045, color: "green"},
  {name: "Name 2", count: 563, color: "purple"},
  {name: "Name 3", count: 231, color: "silver"},
  {name: "Name 4", count: 423, color: "brown"}
];

const canvas1 = document.getElementById('canvasDrawing1');
const context1 = canvas1.getContext('2d');


/* 1. this is the simple approach */

let y = 0;
// loop through data and draw rectangle for each
for (let item of data) {
  console.log(item);
  let x = 20;
  y = y + 50;
  let w = item.count/2;
  let h = 25;
  context1.fillStyle = item.color;
  context1.fillRect(x, y, w, h);

  context1.fillStyle = "#000000"; // fill color
  context1.font = "bold 15px sans-serif";
  context.fillText( item.name, w + x, y+18);

}


/* 2. This can scale as per the data limits dynamically */

var total = data.reduce(function(sum, sel) {
  return (sum + sel.count);
}, 0)

var max = data.reduce(function(val, sel) {
  if (val > sel.count) {
    return val;
  } else {
    return sel.count;
  }
}, 0)

var scalef = (canvas.height - 50)/max;
context.moveTo(10,300);

var curr_x = 10,
curr_y = 390,
width = 30,
clearance = 5;

data.forEach(function(item) {
  curr_x += width+clearance;
  context.fillStyle = item.color;
  context.fillRect(curr_x,curr_y,width,-item.count*scalef);
  console.log(item.count*scalef);
})
