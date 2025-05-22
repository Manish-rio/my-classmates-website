// script.js

let semesterCount = 0;
const semesterData = [];

// Add a new semester block
function addSemester() {
  semesterCount++;
  const container = document.getElementById("semesters");

  const semesterDiv = document.createElement("div");
  semesterDiv.className = "semester";
  semesterDiv.id = `semester-${semesterCount}`;

  const title = document.createElement("h2");
  title.textContent = `Semester ${semesterCount}`;

  const courseContainer = document.createElement("div");
  courseContainer.className = "course-container";

  const addCourseBtn = document.createElement("button");
  addCourseBtn.textContent = "Add Course";
  addCourseBtn.onclick = () => addCourse(courseContainer);

  semesterDiv.appendChild(title);
  semesterDiv.appendChild(courseContainer);
  semesterDiv.appendChild(addCourseBtn);
  container.appendChild(semesterDiv);

  addCourse(courseContainer); // Add first course by default
}

// Add a course row to a semester
function addCourse(container) {
  const courseDiv = document.createElement("div");
  courseDiv.className = "course";

  const gradeInput = document.createElement("input");
  gradeInput.type = "number";
  gradeInput.placeholder = "Grade Point (e.g. 9)";
  gradeInput.min = 0;
  gradeInput.max = 10;
  gradeInput.required = true;

  const creditInput = document.createElement("input");
  creditInput.type = "number";
  creditInput.placeholder = "Credits (e.g. 3)";
  creditInput.min = 1;
  creditInput.required = true;

  courseDiv.appendChild(gradeInput);
  courseDiv.appendChild(creditInput);
  container.appendChild(courseDiv);
}

// Calculate GPA for each semester and overall CGPA/CPA
function calculateCGPA() {
  const semesters = document.querySelectorAll(".semester");
  let totalPoints = 0;
  let totalCredits = 0;

  let resultHTML = "";

  semesters.forEach((sem, index) => {
    const courses = sem.querySelectorAll(".course");
    let semPoints = 0;
    let semCredits = 0;

    courses.forEach(course => {
      const inputs = course.querySelectorAll("input");
      const grade = parseFloat(inputs[0].value);
      const credit = parseFloat(inputs[1].value);

      if (!isNaN(grade) && !isNaN(credit)) {
        semPoints += grade * credit;
        semCredits += credit;
      }
    });

    const semGPA = semCredits ? (semPoints / semCredits) : 0;
    totalPoints += semPoints;
    totalCredits += semCredits;

    resultHTML += `Semester ${index + 1} GPA: ${semGPA.toFixed(2)}<br>`;
  });

  const cgpa = totalCredits ? (totalPoints / totalCredits) : 0;

  resultHTML += `<br><strong>Total CGPA/CPA: ${cgpa.toFixed(2)}</strong>`;
  document.getElementById("result").innerHTML = resultHTML;
}
