import { NgModule } from '@angular/core';
import {DDDirective} from './d-d.directive';
import {DDComponent} from './d-d.component';
import {DDMaterialStyleComponent} from './d-d-material-style.component';
import {DDService} from './d-d.service';



@NgModule({
  declarations: [
    DDDirective,
    DDComponent,
    DDMaterialStyleComponent,
  ],
  exports: [
    DDDirective,
    DDMaterialStyleComponent,
  ],
  providers: [
    DDService,
  ],
  entryComponents: [
    DDComponent,
  ],
})
export class DDMaterialStyleModule { }
