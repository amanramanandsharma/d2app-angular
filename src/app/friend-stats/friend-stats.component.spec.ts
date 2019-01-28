import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendStatsComponent } from './friend-stats.component';

describe('FriendStatsComponent', () => {
  let component: FriendStatsComponent;
  let fixture: ComponentFixture<FriendStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
