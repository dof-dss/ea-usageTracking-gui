import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditslistComponent } from './auditslist.component';

describe('AuditslistComponent', () => {
  let component: AuditslistComponent;
  let fixture: ComponentFixture<AuditslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
