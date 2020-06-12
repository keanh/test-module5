import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../book.service";
import {Book} from "../book";
import {ActivatedRoute, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;
  bookList: Book[] = [];
  constructor(private bookService: BookService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const {value} = this.bookForm;
      this.bookService.createBook(value)
        .subscribe(next => {
          this.router.navigate(['/book']);
          this.bookList.unshift(next);
          this.bookForm.reset({
            title: '',
            author: '',
            description: ''
          });
        }, error => console.log(error));
    }
  }
}
