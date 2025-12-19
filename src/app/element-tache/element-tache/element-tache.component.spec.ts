import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTacheComponent } from './element-tache.component';

describe('ElementTacheComponent', () => {
  let component: ElementTacheComponent;
  let fixture: ComponentFixture<ElementTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementTacheComponent]
    });
    fixture = TestBed.createComponent(ElementTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
