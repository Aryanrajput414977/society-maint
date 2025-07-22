// Dummy users & data
const dummyUsers = [{username:"resident", password:"1234", type:"user"}, {username:"admin", password:"admin", type:"admin"}];
const maintenanceData = [
  {month: "Jan 2025", amount: "₹1500", status: "Paid"},
  {month: "Feb 2025", amount: "₹1500", status: "Unpaid"},
];
const complaintsData = [
  {date: "2025-07-01", category: "Water Issue", status: "Pending"},
  {date: "2025-07-10", category: "Security", status: "Resolved"},
];

// Save dummy data to localStorage if not present
if (!localStorage.getItem("users")) localStorage.setItem("users", JSON.stringify(dummyUsers));
if (!localStorage.getItem("maintenance")) localStorage.setItem("maintenance", JSON.stringify(maintenanceData));
if (!localStorage.getItem("complaints")) localStorage.setItem("complaints", JSON.stringify(complaintsData));

// Login logic
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();
    const uname = document.getElementById("username").value;
    const pwd = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(u => u.username === uname && u.password === pwd);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      if (user.type === "admin") window.location.href = "admin.html";
      else window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginError").innerText = "Invalid credentials";
    }
  };
}

// Logout
function logout() {
  localStorage.removeItem("loggedUser");
}

// Dashboard greeting
if (document.getElementById("welcomeName")) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  document.getElementById("welcomeName").innerText = "Hello, " + user.username + "!";
  const maint = JSON.parse(localStorage.getItem("maintenance"));
  document.getElementById("lastBill").innerText = maint[maint.length-1].amount + " | Status: " + maint[maint.length-1].status;
}

// Maintenance history
if (document.getElementById("maintenanceTable")) {
  const maint = JSON.parse(localStorage.getItem("maintenance"));
  maint.forEach(row => {
    let r = document.createElement("tr");
    r.innerHTML = `<td>${row.month}</td><td>${row.amount}</td><td>${row.status}</td>`;
    document.getElementById("maintenanceTable").appendChild(r);
  });
}

// Complaints list
if (document.getElementById("complaintsTable")) {
  const data = JSON.parse(localStorage.getItem("complaints"));
  data.forEach(row => {
    let r = document.createElement("tr");
    r.innerHTML = `<td>${row.date}</td><td>${row.category}</td><td>${row.status}</td>`;
    document.getElementById("complaintsTable").appendChild(r);
  });
}

// Complaint submission
if (document.getElementById("complaintForm")) {
  document.getElementById("complaintForm").onsubmit = function(e) {
    e.preventDefault();
    const cList = JSON.parse(localStorage.getItem("complaints"));
    const date = new Date().toISOString().slice(0,10);
    const cat = document.getElementById("compCategory").value;
    const desc = document.getElementById("compDesc").value;
    cList.push({date: date, category: cat, status: "Pending"});
    localStorage.setItem("complaints", JSON.stringify(cList));
    document.getElementById("compSuccess").innerText = "Your complaint submitted!";
    setTimeout(()=>{document.getElementById("compSuccess").innerText="";},2000);
  };
}

// Admin summary
if (document.getElementById("adminComplaints")) {
  const comps = JSON.parse(localStorage.getItem("complaints"));
  comps.forEach(row => {
    let r = document.createElement("tr");
    r.innerHTML = `<td>Flat 101</td><td>${row.category}</td><td>${row.status}</td>`;
    document.getElementById("adminComplaints").appendChild(r);
  });
}
if (document.getElementById("adminMaintenance")) {
  const maint = JSON.parse(localStorage.getItem("maintenance"));
  maint.forEach(row => {
    let r = document.createElement("tr");
    r.innerHTML = `<td>Flat 101</td><td>${row.month}</td><td>${row.amount}</td><td>${row.status}</td>`;
    document.getElementById("adminMaintenance").appendChild(r);
  });
}
