function changeUnit() {
  const unit = document.getElementById("unit").value;
  document.getElementById("bust").placeholder = `Bust (${unit})`;
  document.getElementById("waist").placeholder = `Waist (${unit})`;
  document.getElementById("hip").placeholder = `Hip (${unit})`;
  document.getElementById("height").placeholder = `Height (${unit})`;
  document.getElementById("length").placeholder = `Length (${unit})`;
  document.getElementById("sleeve").placeholder = `Sleeve Length (${unit})`;
  document.getElementById("shoulder").placeholder = `Shoulder Width (${unit})`;
  document.getElementById("armhole").placeholder = `Armhole (${unit})`;
}

function saveMeasurements() {
  const unit = document.getElementById("unit").value;
  const bust = document.getElementById("bust").value;
  const waist = document.getElementById("waist").value;
  const hip = document.getElementById("hip").value;
  const height = document.getElementById("height").value;
  const length = document.getElementById("length").value;
  const sleeve = document.getElementById("sleeve").value;
  const shoulder = document.getElementById("shoulder").value;
  const armhole = document.getElementById("armhole").value;
  const notes = document.getElementById("notes").value;

  // Basic validation
  if (!bust || !waist || !hip) {
    alert("Please enter Bust, Waist, and Hip measurements.");
    return;
  }

  // Summary alert
  let summary =
    `Measurements (${unit}):\n` +
    `Bust: ${bust}\n` +
    `Waist: ${waist}\n` +
    `Hip: ${hip}\n` +
    `Height: ${height}\n` +
    `Length: ${length}\n` +
    `Sleeve Length: ${sleeve}\n` +
    `Shoulder Width: ${shoulder}\n` +
    `Armhole: ${armhole}\n` +
    `Notes: ${notes}`;

  alert(summary);
}

