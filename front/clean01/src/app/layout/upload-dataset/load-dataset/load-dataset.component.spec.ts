import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDatasetComponent } from './load-dataset.component';

describe('LoadDatasetComponent', () => {
  let component: LoadDatasetComponent;
  let fixture: ComponentFixture<LoadDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
