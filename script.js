const feeStructure={
    "BTech CSE":{tuition:60000,lab:7800,library:2500,other:1500},
     "BTech AI":{tuition:65000,lab:9000,library:3500,other:1500},
      "BTech ECE":{tuition:70000,lab:9000,library:2500,other:1500},
       "BTech ME":{tuition:50000,lab:6000,library:1500,other:500}
}

let students = [];

// Add student
function addStudent() {
  const name = document.getElementById('name').value;
  const Father = document.getElementById('Father').value;
  const studentClass = document.getElementById('class').value;
  const contact = document.getElementById('contact').value;

  if (studentClass === "") { alert("Select a course"); return; }

  const student = { name, Father, class: studentClass, contact, fees: feeStructure[studentClass] };

  fetch('http://localhost:3000/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  })
  .then(() => { clearForm(); fetchStudents(); });
}

function fetchStudents() {
  fetch('http://localhost:3000/students')
    .then(res => res.json())
    .then(data => { students = data; displayStudents(); });
}

// Display students
function displayStudents() {
  const listDiv = document.getElementById('studentList');
  listDiv.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    const studentDiv = document.createElement('div');
    studentDiv.className = 'student-box';
    studentDiv.innerHTML = `
      <b>${students[i].name}</b> (parent: ${students[i].Father})<br>
      Class: ${students[i].class}, Contact: ${students[i].contact}<br>
      <button onclick="showFee(${i})">Show Fee</button>
      <div id="fee${i}" style="display:none; margin-top:5px;"></div>
    `;
    listDiv.appendChild(studentDiv);
  }
}

// Show fee
function showFee(index) {
  const student = students[index];
  const feeDiv = document.getElementById(`fee${index}`);
  const total = student.fees.tuition + student.fees.lab + student.fees.library + student.fees.other;

  feeDiv.innerHTML = `
    Tuition: ₹${student.fees.tuition}<br>
    Lab: ₹${student.fees.lab}<br>
    Library: ₹${student.fees.library}<br>
    Other: ₹${student.fees.other}<br>
    <b>Total: ₹${total}</b>
  `;
  feeDiv.style.display = 'block';
}

function clearForm() {
  document.getElementById('name').value = "";
  document.getElementById('Father').value = "";
  document.getElementById('class').value = "";
  document.getElementById('contact').value = "";
}


window.onload = fetchStudents;