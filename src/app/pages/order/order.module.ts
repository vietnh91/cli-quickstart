import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule, MatIconModule, MatDialogModule,
	MatButtonModule, MatListModule, MatAutocompleteModule, MatSlideToggleModule, MatCardModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderAddComponent } from './order-add/order-add.component';
import { ClickOutsideDirective } from 'src/app/directive/clickoutside.directive';
import { ProductInputComponent } from 'src/app/component/product-input/product-input.component';
import { CustomerInputComponent } from 'src/app/component/customer-input/customer-input.component';
import { TxcrmService } from 'src/app/service/txcrm.service';
import { AddressAddComponent } from './address-add/address-add.component';

const routes: Routes = [
	{
		path: '',
		component: OrderComponent
	}
];

@NgModule({
	declarations: [
		OrderComponent,
		OrderAddComponent,
		AddressAddComponent,
		ClickOutsideDirective,
		ProductInputComponent,
		CustomerInputComponent,
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		ReactiveFormsModule,
		OrderRoutingModule,
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
		MatCardModule,
	],
	entryComponents: [
		OrderAddComponent,
		AddressAddComponent,
	],
	providers: [
		TxcrmService,
	],
	exports: [
		RouterModule,
	],
})
export class OrderModule { }
