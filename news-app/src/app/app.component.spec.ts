import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginControlsComponent } from './components/login-controls/login-controls.component';
import { ControlsPanelComponent } from './components/controls-panel/controls-panel.component';
import { SelectComponent } from './ui/select/select.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                HeaderComponent,
                FooterComponent,
                LoginControlsComponent,
                ControlsPanelComponent,
                SelectComponent,
                CheckboxComponent,

            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
