// fetch the data from the JSON file
fetch('mockdata.json.json')
  .then(response => response.json())
  .then(data => {
    // function to render the table rows
    function renderTableRows(data) {
      const tableBody = document.querySelector('tbody');
      tableBody.innerHTML = '';
      data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>
            <img src="${item.img_src}" alt="${item.first_name} ${item.last_name}">
            ${item.first_name} ${item.last_name}
          </td>
          <td>${item.gender}</td>
          <td>${item.class}</td>
          <td>${item.marks}</td>
          <td>${item.passing ? 'Passing' : 'Failed'}</td>
          <td>${item.email}</td>
        `;
        tableBody.appendChild(tr);
      });
    }

    // render the initial table
    renderTableRows(data);

    // get the search input and search button
    const searchInput = document.getElementById('searchinput');
    const searchButton = document.getElementById('searchbutton');

    // function to handle the search event
    function handleSearch() {
      const searchText = searchInput.value.toLowerCase();
      const filteredData = data.filter(item => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        const email = item.email.toLowerCase();
        return fullName.includes(searchText) || email.includes(searchText);
      });
      renderTableRows(filteredData);
    }

    // handle search button click event
    searchButton.addEventListener('click', handleSearch);

    // handle search input change event
    // searchInput.addEventListener('input', handleSearch);

    // get the sort buttons
    const sortAscButton = document.getElementById('sortasc');
    const sortDescButton = document.getElementById('sortdesc');
    const sortByMarksButton = document.getElementById('sortbymarks');
    const sortByPassingButton = document.getElementById('sortbypassing');
    const sortByClassButton = document.getElementById('sortbyclass');
    const sortByGenderButton = document.getElementById('sortbygender');

    // function to handle sort by full name in ascending order
    function sortByNameAsc() {
      const sortedData = data.slice().sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      renderTableRows(sortedData);
    }

    // function to handle sort by full name in descending order
    function sortByNameDesc() {
      const sortedData = data.slice().sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameB.localeCompare(nameA);
      });
      renderTableRows(sortedData);
    }

    // function to handle sort by marks in ascending order
    function sortByMarksAsc() {
      const sortedData = data.slice().sort((a, b) => a.marks - b.marks);
      renderTableRows(sortedData);
    }

    // function to handle sort by passing status
    function sortByPassing() {
      const sortedData = data.filter(item => item.passing);
      renderTableRows(sortedData);
    }

    // function to handle sort by class in ascending order
    function sortByClassAsc() {
        const sortedData = data.slice().sort((a, b) => a.class - b.class);
        renderTableRows(sortedData);
      }
        // function to handle sort by gender
function sortByGender() {
    const sortedData = data.slice().sort((a, b) => {
      const genderA = a.gender.toLowerCase();
      const genderB = b.gender.toLowerCase();
      return genderA.localeCompare(genderB);
    });
    renderTableRows(sortedData);
  }
  
  // handle sort buttons click events
  sortAscButton.addEventListener('click', sortByNameAsc);
  sortDescButton.addEventListener('click', sortByNameDesc);
  sortByMarksButton.addEventListener('click', sortByMarksAsc);
  sortByPassingButton.addEventListener('click', sortByPassing);
  sortByClassButton.addEventListener('click', sortByClassAsc);
  sortByGenderButton.addEventListener('click', sortByGender);
})
.catch(error => console.log(error));   
