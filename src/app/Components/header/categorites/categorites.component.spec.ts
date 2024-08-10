import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoritesComponent } from './categorites.component';

describe('CategoritesComponent', () => {
  let component: CategoritesComponent;
  let fixture: ComponentFixture<CategoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
