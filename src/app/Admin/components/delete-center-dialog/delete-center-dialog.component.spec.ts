import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCenterDialogComponent } from './delete-center-dialog.component';

describe('DeleteCenterDialogComponent', () => {
  let component: DeleteCenterDialogComponent;
  let fixture: ComponentFixture<DeleteCenterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCenterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCenterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
