const semesters = [
  {
    name: "Semester 1",
    courses: [
      { name: "Mathematics – I", credit: 4 },
      { name: "Engineering Physics", credit: 3 },
      { name: "Basic Electrical Engg.", credit: 3 },
      // Add more courses...
    ]
  },
  {
    name: "Semester 2",
    courses: [
      { name: "Mathematics – II", credit: 4 },
      { name: "Engineering Chemistry", credit: 3 },
      { name: "C Programming", credit: 3 },
      // Add more courses...
    ]
  },
  // Add more semesters...
];
// script.js

// Mapping of grades to numbers
const gradeMap = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'NA': 0
};

// This will store all semester GPA/credit info for CGPA calculation
let allSemesterData = [];

// Called when a dropdown changes
function updateGrade(semesterIndex, courseIndex) {
  const gradeSelect = document.getElementById(`grade-${semesterIndex}-${courseIndex}`);
  const gradeNumberField = document.getElementById(`gradeNum-${semesterIndex}-${courseIndex}`);
  const selectedGrade = gradeSelect.value;

  // Update grade number field
  gradeNumberField.textContent = gradeMap[selectedGrade] || '-';

  calculateGPAandCGPA(semesterIndex);
}

// Calculate GPA and CGPA for a specific semester
function calculateGPAandCGPA(semesterIndex) {
  const courseRows = document.querySelectorAll(`#semester-${semesterIndex} tbody tr`);
  let totalCredits = 0;
  let totalPoints = 0;

  courseRows.forEach(row => {
    const credit = parseFloat(row.querySelector('.credit').textContent);
    const gradeText = row.querySelector('.grade-num').textContent;

    if (!isNaN(credit) && !isNaN(parseFloat(gradeText))) {
      totalCredits += credit;
      totalPoints += credit * parseFloat(gradeText);
    }
  });

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  // Store/update this semester data
  allSemesterData[semesterIndex] = { totalPoints, totalCredits };

  // Calculate CGPA up to this semester
  let cumCredits = 0;
  let cumPoints = 0;

  for (let i = 0; i <= semesterIndex; i++) {
    if (allSemesterData[i]) {
      cumCredits += allSemesterData[i].totalCredits;
      cumPoints += allSemesterData[i].totalPoints;
    }
  }

  const cgpa = cumCredits > 0 ? (cumPoints / cumCredits).toFixed(2) : "0.00";

  // Update results in the DOM
  document.getElementById(`gpa-${semesterIndex}`).textContent = gpa;
  document.getElementById(`cgpa-${semesterIndex}`).textContent = cgpa;
}
