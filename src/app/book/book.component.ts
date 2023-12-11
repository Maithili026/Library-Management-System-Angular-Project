// book.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  showForm: boolean = false; // Initialize showForm as a boolean
  books: Book[] = [];
  bookForm: FormGroup;

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      quantity: ['', Validators.required],
      availability: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
    });
  }

  getBookById(id: number | undefined): void {
    if (id !== undefined) {
      this.bookService.getBookById(id).subscribe(data => {
        this.bookForm.patchValue(data);
      });
    }
  }

  createOrUpdateBook(): void {
    const bookData = this.bookForm.value;

    if (bookData.id) {
      this.bookService.updateBook(bookData.id, bookData).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    } else {
      this.bookService.createBook(bookData).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    }
  }

  deleteBook(id: number | undefined): void {
    if (id !== undefined) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.getAllBooks();
      });
    }
  }

  resetForm(): void {
    this.bookForm.reset();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
