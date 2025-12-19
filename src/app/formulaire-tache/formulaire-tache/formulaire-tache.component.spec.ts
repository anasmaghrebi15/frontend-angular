import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireTacheComponent } from './formulaire-tache.component';

describe('FormulaireTacheComponent', () => {
  let component: FormulaireTacheComponent;
  let fixture: ComponentFixture<FormulaireTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireTacheComponent]
    });
    fixture = TestBed.createComponent(FormulaireTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
