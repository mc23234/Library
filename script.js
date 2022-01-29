const container = document.querySelector('.container');

const submitFormBtn = document.getElementById("submit-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const bookContainer = document.querySelector('.book-container');

const form = document.querySelector('.form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const genre = document.getElementById('genre');
const status = document.getElementById('status');
const inputs = document.querySelectorAll('input');

const addBook = document.querySelector('.add-book');

let myLibrary = {};


function Book(title,author,pages,genre,read){
	this.title = title
	this.author = author
	this.pages = pages
	this.genre = genre
	this.read = read;
}	

Book.prototype.remove = function(div){
		delete myLibrary[this.title];
		bookContainer.removeChild(div);
		storeToLocal();
}
	
Book.prototype.changeStatus = function(value){
		myLibrary[this.title]['read'] = value; 
		storeToLocal();
}	

Book.prototype.info = function(){
	return `Title  : ${this.title} <br>
			Author : ${this.author} <br>
			Pages  : ${this.pages} <br>
			Genre  : ${this.genre} <br>`;
};

function createBook(title,author,pages,genre,read){
	
	let book = new Book(title,author,pages,genre,read);
	myLibrary[book.title] = book;
	
	let div = document.createElement('div');
	div.classList.add('book-card');
	bookContainer.appendChild(div);
	div.innerHTML = book.info();
	
		
	let removeBtn = document.createElement('button');
	removeBtn.classList.add('remove-button');
	removeBtn.classList.add('button');
	removeBtn.textContent = 'Remove Book';
	
	let readStatus = document.createElement('select');
	readStatus.classList.add('card-status');
	readStatus.classList.add('button');

	let option1 = document.createElement('option');
	let option2 = document.createElement('option');
	let option3 = document.createElement('option');
	
	readStatus.appendChild(option1);
	readStatus.appendChild(option2);
	readStatus.appendChild(option3);


	div.appendChild(removeBtn);
	div.appendChild(readStatus);
	
	removeBtn.addEventListener('click',() => {
			book.remove(div);
	})
	
	switch(read){
		case 'Read':
			option1.textContent = 'Read';
			option2.textContent = 'Not read';
			option3.textContent = 'Reading';
			break;
		case 'Not read':
			option1.textContent = 'Not read';
			option2.textContent = 'Read';
			option3.textContent = 'Reading';
			break;
		case 'Reading':
			option1.textContent = 'Reading';
			option2.textContent = 'Not read';
			option3.textContent = 'Read';
			break;
	
	}
	readStatus.addEventListener('change' ,() => {
			book.changeStatus(readStatus.value);
	});
	
	storeToLocal();
	inputs.forEach(inp => {inp.value = ''; status.value = ''});

}

function storeToLocal(){
	localStorage.setItem('lib-key',JSON.stringify(myLibrary));
}

function getFromLocal(){
	let tempLib = JSON.parse(localStorage.getItem('lib-key'));
	for(key in tempLib){
		let title = tempLib[key].title;
		let author = tempLib[key].author;
		let pages = tempLib[key].pages;
		let genre = tempLib[key].genre;
		let read = tempLib[key].read;
		console.log(title);
		createBook(title,author,pages,genre,read);
	}
}


submitFormBtn.addEventListener('click', () => {
	if(title.value && author.value && pages.value && genre.value && status.value){
		createBook(title.value,author.value,pages.value,genre.value,status.value);
		container.style.filter = "blur(0px)";
		form.style.display = 'none';
	}
});

closeFormBtn.addEventListener('click', () => {
	container.style.filter = "blur(0px)";
	form.style.display = 'none';
	inputs.forEach(inp => {inp.value = ''; status.value = ''});

});

addBook.addEventListener('click', () => {
	form.style.display = 'flex';
	container.setAttribute('style',"filter:blur(2px)");
});
	
if(localStorage.getItem('lib-key'))
	getFromLocal();
