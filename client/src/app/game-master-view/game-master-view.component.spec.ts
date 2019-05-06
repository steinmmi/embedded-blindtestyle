import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMasterViewComponent } from './game-master-view.component';

describe('GameMasterViewComponent', () => {
  let component: GameMasterViewComponent;
  let fixture: ComponentFixture<GameMasterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMasterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
