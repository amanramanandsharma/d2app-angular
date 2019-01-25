import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamUserComponent } from './steam-user.component';

describe('SteamUserComponent', () => {
  let component: SteamUserComponent;
  let fixture: ComponentFixture<SteamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
