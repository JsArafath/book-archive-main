const searchResult = document.getElementById('search-result');
// search books 
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeNode(searchResult)
            displaySearchResult(data.docs, data)
        })
}
// display search results
const displaySearchResult = (docs, data) => {

    const totalResult = document.getElementById('total-result');
    if (docs.length === 0) {
        totalResult.innerHTML = `<h5 class="d-block text-light text-center mb-4 fw-bold">Result not found</h5>`
        removeNode(searchResult)
    }
    if (docs.length) {
        totalResult.innerHTML = `<h5 class="d-block text-light text-center mb-4 fw-bold">Total Results: ${data.numFound}</h5>`
    }
    docs.forEach(books => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    
        <div class="card h-100 p-4 border border-primary border-3 rounded">
        <img src=" https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg
        " class="card-img-top w-100 mx-auto border border-secondary border-2 rounded" alt="...">
        <div class="card-body">
          <h2 class="card-title text-center fw-bold">${books.title}</h2>
          <h5 class="card-title text-center text-secondary"><b><u>Author</u></b>: ${books.author_name}</h5>
          <p class="card-text text-center fw-bold text-info">First Published: Year ${books.first_publish_year}</p>
          <p class="card-text text-center fw-bold text-dark">Publish Date: ${books.publish_date}</p>
    
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    });

}
//Remove Node
const removeNode = element => {
    var node = element;
    while (element.hasChildNodes()) { // selected elem has children

        if (node.hasChildNodes()) { // current node has children
            node = node.lastChild; // set current node to child
        } else { // last child found
            node = node.parentNode; // set node to parent
            node.removeChild(node.lastChild); // remove last node
        }
    }
}