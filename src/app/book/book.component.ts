import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  bookList: Book[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(next => (this.bookList = next), error => (this.bookList = []));
    console.log(this.bookList);
  }

  deleteBook(i){
    const book = this.bookList[i];
    this.bookService.deleteBook(book.id).subscribe(() => {
      this.bookList = this.bookList.filter(t => t.id !== book.id);
    });
  }
}
