// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];

// Function to fetch API and measure time
async function callingAPIs(url) {
  let start = performance.now();
  let response = await fetch(url);
  let result = await response.json(); // Fix: Await json parsing
  let end = performance.now();
  let timeTaken = end - start;
  return { data: result, time: timeTaken };
}

// Fetch all APIs in parallel
let promAll = Promise.all(apiUrls.map(url => callingAPIs(url)));

promAll.then(results => {
  let maxTimeForAll = Math.max(...results.map(r => r.time)); // Find max time
  document.getElementById("output-all").textContent = `${maxTimeForAll.toFixed(2)} ms`;
});

let promAny = Promise.any(apiUrls.map((url) => callingAPIs(url)));

promAny.then((results) => {
  let timeTaken = results.time;
  document.getElementById("output-any").textContent = `${timeTaken.toFixed(2)} ms`;
});
