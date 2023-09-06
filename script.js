document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("stream-form");
    const tableBody = document.querySelector("#stream-table tbody");
    const saveButton = document.getElementById("save-button");
    const localStorageKey = "streamEntries";
    const searchInput = document.getElementById("search");
  
    let entries = []; // Array to store stream entries
    let sortColumn = "dateTime"; // Default sorting column
    let sortDirection = "desc"; // Default sorting direction
  
    // Function to load existing entries from localStorage
    function loadEntries() {
      const entriesJSON = localStorage.getItem(localStorageKey);
      if (entriesJSON) {
        entries = JSON.parse(entriesJSON);
      }
      renderTable(); // Render the table after loading entries
    }
  
    // Function to add a row to the table and save the entry
    function addRowToTable(entry) {
      entries.push(entry);
      localStorage.setItem(localStorageKey, JSON.stringify(entries));
      renderTable();
    }
  
    // Function to render the table
    function renderTable(entriesToRender = entries) {
      // Clear the table
      tableBody.innerHTML = "";
  
      // Populate the table with sorted entries
      entriesToRender.forEach(function (entry) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><a href="${entry.link}" target="_blank">${entry.link}</a></td>
            <td>${entry.description}</td>
            <td>${entry.dateTime}</td>
            <td>${entry.city || ""}</td>
            <td>${entry.state || ""}</td>
            <td>${entry.latitude}</td>
            <td>${entry.longitude}</td>
        `;
        tableBody.appendChild(newRow);
      });
    }
  
    // Event listener for form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // ... (rest of your code for form submission)
  
      // After adding the entry, filter the table based on the search input
      filterTable();
    });
  
    // Event listener for sorting column headers
    document.querySelectorAll("th").forEach((header) => {
      header.addEventListener("click", function () {
        const column = header.getAttribute("data-column");
  
        // Toggle the sort direction if the same column is clicked
        if (sortColumn === column) {
          sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
          // Default to descending for a new column
          sortDirection = "desc";
          sortColumn = column;
        }
  
        // Sort the entries
        entries.sort((a, b) => {
          const valueA = a[column];
          const valueB = b[column];
  
          if (sortDirection === "asc") {
            return valueA.localeCompare(valueB);
          } else {
            return valueB.localeCompare(valueA);
          }
        });
  
        // Render the sorted table
        renderTable(entries);
      });
    });
  
    // Event listener for the search input
    searchInput.addEventListener("input", function () {
      filterTable();
    });
  
    // Function to filter the table based on the search input
    function filterTable() {
      const searchText = searchInput.value.toLowerCase();
      const filteredEntries = entries.filter((entry) =>
        Object.values(entry)
          .join(" ")
          .toLowerCase()
          .includes(searchText)
      );
      renderTable(filteredEntries);
    }
  
    // Load existing entries when the page loads
    loadEntries();
  
    // Function to add static records that always show up
    function addStaticRecords() {
      const staticRecords = [
        {
          link:
            "https://www.youtube.com/watch?v=113Pc5FMzog&pp=ygUbZXhoaWJpdGlvbiB0aHJlZXMgbnl2YXJzaXR5",
          description: "2023 AVP MBO TaCrabb/Sander vs Budinger/Evans (8/19)",
          dateTime: "2023-08-19 10:00 AM",
          city: "Manhattan Beach",
          state: "CA",
          latitude: "33.891599",
          longitude: "-118.395124",
        },
        {
          link: "https://www.youtube.com/watch?v=mUoJU1JWn1w",
          description: "2023 Motherlode: Couts/G.Basey vs Del Sol/Hoover",
          dateTime: "2023-09-4 3:00 PM",
          city: "Aspen",
          state: "CO",
          latitude: "39.191113",
          longitude: "-106.823560",
        },
        {
          link: "https://www.youtube.com/watch?v=jBqZ3RqQCDc",
          description: "2023 Motherlode 45s Griffith/Young vs Sadler/Sass",
          dateTime: "2023-08-31 2:00 PM",
          city: "Aspen",
          state: "CO",
          latitude: "39.191113",
          longitude: "-106.823560",
        },
      ];
  
      staticRecords.forEach(function (record) {
        addRowToTable(record);
      });
    }
  
    // Call the function to add static records
    addStaticRecords();
  });
  