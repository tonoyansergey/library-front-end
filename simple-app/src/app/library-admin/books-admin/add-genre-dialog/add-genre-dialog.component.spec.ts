import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenreDialogComponent } from './add-genre-dialog.component';

describe('AddGenreDialogComponent', () => {
  let component: AddGenreDialogComponent;
  let fixture: ComponentFixture<AddGenreDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGenreDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
