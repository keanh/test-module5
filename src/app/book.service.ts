import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./book";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API_URL = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  getBooks(count = 10): Observable<Book[]>{
    return this.http.get<Book[]>(this.API_URL);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  deleteBook(id: number): Observable<Book>{
    return this.http.delete<Book>(`${this.API_URL}/${id}`);
  }

  updateBook(book: Book): Observable<Book>{
    // console.log(book);
    return this.http.put<Book>(`${this.API_URL}/${book.id}`, book);
  }
}
