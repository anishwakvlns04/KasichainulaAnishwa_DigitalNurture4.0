// ------------------------
// Task 1: JavaScript Basics
// ------------------------
console.log("Welcome to the Community Portal");
alert("Page is fully loaded");

// ------------------------
// Task 2: Data Types & Operators
// ------------------------
const eventName = "Community Cleanup";
const eventDate = "2025-06-10";
let availableSeats = 20;
console.log(`Event: ${eventName}, Date: ${eventDate}, Seats: ${availableSeats}`);
availableSeats--;
console.log(`Seats left after registration: ${availableSeats}`);

// ------------------------
// Task 3: Conditionals & Loops
// ------------------------
const events = [
  { name: "Music Festival", date: "2025-07-01", seats: 10, category: "Music" },
  { name: "Art Workshop", date: "2024-12-01", seats: 0, category: "Art" },
  { name: "Food Fair", date: "2023-05-10", seats: 5, category: "Food" },
  { name: "Tech Talk", date: "2025-06-15", seats: 3, category: "Technology" }
];

const today = new Date();
console.log("Upcoming events:");
events.forEach(event => {
  try {
    const eventDate = new Date(event.date);
    if (eventDate >= today && event.seats > 0) {
      console.log(`${event.name} on ${event.date} - Seats: ${event.seats}`);
    } else if (eventDate < today) {
      console.log(`${event.name} has passed.`);
    } else {
      console.log(`${event.name} is full.`);
    }
  } catch (err) {
    console.error("Error in event data", event.name, err);
  }
});

// ------------------------
// Task 4: Functions & Closures
// ------------------------
function addEvent(eventArray, newEvent) {
  eventArray.push(newEvent);
}

function registerUser(event) {
  if (event.seats > 0) {
    event.seats--;
    return true;
  }
  return false;
}

function filterEventsByCategory(category) {
  return events.filter(ev => ev.category === category);
}

// Closure to track total registrations
function createRegistrationTracker() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}
const trackRegistration = createRegistrationTracker();

// ------------------------
// Task 5: Objects & Prototypes
// ------------------------
function Event(name, date, seats) {
  this.name = name;
  this.date = date;
  this.seats = seats;
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

const workshop = new Event("Workshop on Baking", "2025-06-20", 12);
console.log(Object.entries(workshop));

// ------------------------
// Task 6: Arrays & Methods
// ------------------------
const communityEvents = [];
communityEvents.push(workshop);
communityEvents.push(new Event("Music Night", "2025-06-18", 8));

const musicEvents = communityEvents.filter(e => e.name.includes("Music"));
const formatted = communityEvents.map(e => `📅 ${e.name} - ${e.date}`);
console.log(formatted);

// ------------------------
// Task 7: DOM Manipulation
// ------------------------
const eventListDiv = document.querySelector("#event-list");
function displayEvents(eventArray) {
  eventListDiv.innerHTML = "";
  eventArray.forEach(ev => {
    const card = document.createElement("div");
    card.innerHTML = `<strong>${ev.name}</strong> - ${ev.date} (${ev.seats} seats)`;
    eventListDiv.appendChild(card);
  });
}
displayEvents(events);

// ------------------------
// Task 8: Event Handling
// ------------------------

// Add filter dropdown and search box to the page (assuming they are not in HTML)
const filterHTML = `
  <label for="categorySelect">Filter by Category:</label>
  <select id="categorySelect">
    <option value="All">All</option>
    <option value="Music">Music</option>
    <option value="Art">Art</option>
    <option value="Food">Food</option>
    <option value="Technology">Technology</option>
  </select>

  <label for="searchInput">Search by Name:</label>
  <input type="text" id="searchInput" placeholder="Search events..." />
`;

// Insert filters above the event list div
eventListDiv.insertAdjacentHTML('beforebegin', filterHTML);

// Grab references to new filter elements
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");

// We'll keep a filteredEvents array for current filtered events
let filteredEvents = [...events];

// Update displayEvents to add Register buttons and handle registration clicks
function displayEventsWithRegister(eventArray) {
  eventListDiv.innerHTML = "";
  
  eventArray.forEach(ev => {
    const card = document.createElement("div");
    card.innerHTML = `
      <strong>${ev.name}</strong> - ${ev.date} (${ev.seats} seats)
      <button>Register</button>
    `;

    const registerBtn = card.querySelector("button");
    registerBtn.onclick = () => {
      if (ev.seats > 0) {
        ev.seats--;
        alert(`You registered for ${ev.name}. Seats left: ${ev.seats}`);
        displayEventsWithRegister(filteredEvents); // Update list after registration
      } else {
        alert(`${ev.name} is fully booked.`);
      }
    };

    eventListDiv.appendChild(card);
  });
}

// Initial display
displayEventsWithRegister(filteredEvents);

// Filter events by category
categorySelect.onchange = () => {
  const selectedCategory = categorySelect.value;
  filteredEvents = selectedCategory === "All" 
    ? [...events] 
    : events.filter(ev => ev.category === selectedCategory);
  
  // Also apply current search term filter after category filter
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredEvents = filteredEvents.filter(ev => ev.name.toLowerCase().includes(searchTerm));
  }
  
  displayEventsWithRegister(filteredEvents);
};

// Search events by name on keyup
searchInput.onkeyup = () => {
  const searchTerm = searchInput.value.toLowerCase();

  filteredEvents = (categorySelect.value === "All" 
    ? [...events] 
    : events.filter(ev => ev.category === categorySelect.value))
    .filter(ev => ev.name.toLowerCase().includes(searchTerm));
  
  displayEventsWithRegister(filteredEvents);
};


// ------------------------
// Task 9: Async JS, Promises, Async/Await
// ------------------------

const loading = document.getElementById("loading");
const eventList = document.getElementById("event-list");

// Simple function to show events on page
function showEvents(events) {
  eventList.innerHTML = "";
  events.forEach(event => {
    const div = document.createElement("div");
    div.textContent = event.title || "No title";
    eventList.appendChild(div);
  });
}

// Fetch with .then()
function fetchEventsThen() {
  loading.style.display = "block"; // Show loading
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
      loading.style.display = "none"; // Hide loading
      showEvents(data.slice(0, 5));  // Show first 5 events
    })
    .catch(error => {
      loading.style.display = "none";
      console.error("Error fetching events:", error);
    });
}

// Fetch with async/await
async function fetchEventsAsync() {
  try {
    loading.style.display = "block"; // Show loading
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    loading.style.display = "none"; // Hide loading
    showEvents(data.slice(0, 5));   // Show first 5 events
  } catch (error) {
    loading.style.display = "none";
    console.error("Error fetching events:", error);
  }
}

// Call one of these to test:
fetchEventsThen();
// fetchEventsAsync();

// ------------------------
// Task 10: Modern JavaScript Features
// ------------------------

//  Use let, const, default parameters
function greetUser(name = "Guest") {
  console.log(`Hello, ${name}! Welcome to the portal.`);
}
greetUser(); // uses default
greetUser("Amit"); // passes name

//  Destructuring event details
const sampleEvent = {
  name: "Book Reading",
  date: "2025-07-05",
  seats: 15,
  category: "Literature"
};

const { name, date, seats, category } = sampleEvent;
console.log(`Event: ${name}, Date: ${date}, Category: ${category}, Seats: ${seats}`);

//  Spread operator to clone and filter events
const clonedEvents = [...events];
const techEvents = clonedEvents.filter(e => e.category === "Technology");

console.log("Technology Events:");
techEvents.forEach(e => console.log(e.name));
// ------------------------
// Task 11: Working with Forms
// ------------------------

const regForm = document.getElementById("registrationForm");

regForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form refresh

  const { name, email, eventName } = regForm.elements;
  let isValid = true;

  // Clear previous errors
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("eventError").textContent = "";

  // Validate Name
  if (name.value.trim() === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    isValid = false;
  }

  // Validate Email
  if (email.value.trim() === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    isValid = false;
  }

  // Validate Event
  if (eventName.value === "") {
    document.getElementById("eventError").textContent = "Please select an event.";
    isValid = false;
  }

  if (isValid) {
    alert(`Thanks ${name.value}! You've registered for ${eventName.value}.`);
    regForm.reset(); // Clear form after successful submit
  }
});

// ------------------------
// Task 12: AJAX & Fetch API
// ------------------------

function sendRegistrationToServer(data) {
  const status = document.getElementById("submissionStatus");
  status.textContent = "Sending data...";

  // Simulate delay using setTimeout
  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log("Success:", result);
        status.textContent = "Registration successful!";
        status.style.color = "green";
      })
      .catch(error => {
        console.error("Error:", error);
        status.textContent = "Something went wrong.";
        status.style.color = "red";
      });
  }, 1000); // 1-second simulated delay
}

// Modify your form submit listener from Task 11:
regForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const { name, email, eventName } = regForm.elements;
  let valid = true;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("eventError").textContent = "";

  if (name.value.trim() === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    valid = false;
  }

  if (email.value.trim() === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    valid = false;
  }

  if (eventName.value === "") {
    document.getElementById("eventError").textContent = "Please select an event.";
    valid = false;
  }

  if (valid) {
    const userData = {
      name: name.value,
      email: email.value,
      event: eventName.value
    };

    sendRegistrationToServer(userData);
    regForm.reset();
  }
});

// ------------------------
// Task 13: Debugging and Testing
// ------------------------

console.log("Debug: Registration form ready");

// Sample log for testing
function logFormDebug(data) {
  console.log("Debug: Form data to be sent =>", data);
}

// You can call logFormDebug(userData) before sending in sendRegistrationToServer() if needed.

// ------------------------
// Task 14: jQuery and JS Frameworks
// ------------------------

$(document).ready(function () {
  // When the user clicks register (basic demo)
  $("#registerBtn").click(function () {
    console.log("jQuery: Register button clicked");
  });

  // Fade in/out effect for any element with class "event-card"
  $(".event-card").hover(
    function () {
      $(this).fadeTo(200, 0.6);
    },
    function () {
      $(this).fadeTo(200, 1);
    }
  );
});
