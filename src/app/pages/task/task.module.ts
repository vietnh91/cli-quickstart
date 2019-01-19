import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule, MatIconModule, MatDialogModule,
	MatButtonModule, MatListModule, MatAutocompleteModule, MatSlideToggleModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskAddComponent } from './task-add/task-add.component';
import { ClickOutsideDirective } from 'src/app/directive/clickoutside.directive';
import { ProductInputComponent } from 'src/app/component/product-input/product-input.component';
import { CustomerInputComponent } from 'src/app/component/customer-input/customer-input.component';
import { TxcrmService } from 'src/app/service/txcrm.service';

const routes: Routes = [
	{
		path: '',
		component: TaskComponent
	}
];

@NgModule({
	declarations: [
		TaskComponent,
		TaskAddComponent,
		ClickOutsideDirective,
		ProductInputComponent,
		CustomerInputComponent,
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		ReactiveFormsModule,
		TaskRoutingModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		FormsModule,
		MatIconModule,
		MatPaginatorModule,
		MatDialogModule,
		MatButtonModule,
		MatListModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
	],
	entryComponents: [
		TaskAddComponent,
	],
	providers: [
		TxcrmService,
	],
	exports: [
		RouterModule,
	],
})
export class TaskModule { }
