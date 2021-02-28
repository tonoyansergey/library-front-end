import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../library/service/book.service";
import {Book} from "../../library/model/book.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSort, MatDialog, MatDialogConfig} from "@angular/material";
import {ConfirmationDialogComponent} from "../../library/dialog/confirmation-dialog/confirmation-dialog.component";
import {Genre} from "../../library/model/genre.model";
import {Author} from "../../library/model/author.model";
import {GenreService} from "../../library/service/genre.service";
import {AuthorService} from "../../library/service/author.service";
import {EditBookDialogComponent} from "./edit-book-dialog/edit-book-dialog.component";
import {AddBookDialogComponent} from "./add-book-dialog/add-book-dialog.component";
import {AddGenreDialogComponent} from "./add-genre-dialog/add-genre-dialog.component";
import {AddAuthorDialogComponent} from "./add-author-dialog/add-author-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {BookingData} from "../../library/model/booking-data.model";


@Component({
  selector: 'app-books-admin',
  templateUrl: './books-admin.component.html',
  styleUrls: ['./books-admin.component.css']
})
export class BooksAdminComponent implements OnInit {

  private books: Book[];
  private genres: Genre[];
  private authors: Author[];
  searchText: string;
  displayedColumns = ['id', 'title', 'genre', 'author', 'quantity', 'edit', 'delete'];
  dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private bookService: BookService, private genreService: GenreService, private authorService: AuthorService, private dialog: MatDialog) {
    this.getBooks();
    this.getGenres();
    this.getAuthors();
  }


  ngOnInit() {
  }

  getBooks () {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item);
          return item[property];
        };
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

  getGenres() {
    this.genreService.getGenres().subscribe(
      data => {
        this.genres = data
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe(
      data => {
        this.authors = data
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  addBook() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Add book",
      genres: this.genres,
      authors: this.authors
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    const dialogRef = this.dialog.open(AddBookDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          this.bookService.addBook(data).subscribe(resp => {
              location.reload();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            });
        }});
  }


  editBook(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Edit object",
      book: this.getBookById(id),
      genres: this.genres,
      authors: this.authors
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    const dialogRef = this.dialog.open(EditBookDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          this.bookService.updateBook(data).subscribe (resp => {
              location.reload();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            });
        } }
    );
  }

  deleteBook(id: number) {
    this.openConfirmationDialog(id);
  }

  openConfirmationDialog(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.width = "20%";

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data == true) {
          this.bookService.deleteBookById(id);
          location.reload();
        }
      }
    );
  }

  addGenre() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Add new genre"
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(AddGenreDialogComponent, dialogConfig);
  }

  addAuthor() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Add new author"
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(AddAuthorDialogComponent, dialogConfig);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getBookById(id: number): Book {
    return this.books.find(x => x.id === id);
  }
}
