import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule, MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { TXInputableComponent } from 'src/app/component/tx-inputable/tx-inputable.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: TaskComponent
	}
];

@NgModule({
	declarations: [
		TaskComponent,
		TXInputableComponent,
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
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
	],
	exports: [
		RouterModule,
		TXInputableComponent,
	],
})
export class TaskModule { }
