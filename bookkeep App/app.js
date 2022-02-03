class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author= author;
        this.isbn = isbn;
    }
}

class UI{
    static displayBooks(){

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `

         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>

      `;


      list.appendChild(row);


    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
             el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div , form);

        setTimeout(()=> document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value == '';
        document.querySelector('#author').value == '';
        document.querySelector('#isbn').value == '';
    }

    

   
}

class Store{
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

        static addBook(book){
            const books = Store.getBooks();
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }

        static removeBook(isbn){
            const books = Store.getBooks();

            books.forEach((book,index)=>{
                if(book.isbn === isbn){
                    books.splice(index,1);
                }
            });

            localStorage.setItem('books', JSON.stringify(books));

        }
    
}
//display the book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//add a book
document.querySelector('#book-form').addEventListener('submit' , (e)=>{
   
         e.preventDefault();

        //get the form values
         const title = document.querySelector('#title').value;
         const author = document.querySelector('#author').value;
         const isbn = document.querySelector('#isbn').value;


         //validation

         if(title === '' || author === ''|| isbn === ''){
                 UI.showAlert('please fill in all the details','danger');
         }else{

            const book = new Book(title,author,isbn);

            UI.addBookToList(book);

            Store.addBook(book);

            UI.showAlert('Book Added', 'success');

            UI.clearFields();
         }
});

//remove a book

document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });
