import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripPage } from './trip.page';

describe('TripPage', () => {
  let component: TripPage;
  let fixture: ComponentFixture<TripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
