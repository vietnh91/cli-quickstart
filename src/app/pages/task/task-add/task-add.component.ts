import { Component, Inject, OnInit } from '@angular/core';
import { TxcrmService } from 'src/app/service/txcrm.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-task-add',
	templateUrl: './task-add.component.html',
	styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

	options = []
	focus = false
	selected: any = {}

	displayedColumns: string[] = ['productName', 'productCode', 'quantity', 'price', 'itemTotal', 'adjusted', 'netTotal', 'action'];
	footerColumns: string[] = ['productName', 'productCode', 'quantity', 'price', 'itemTotal', 'adjusted', 'netTotal', 'action'];

	order: any = {
		customer: {},
		orderItems: [],
		invoiceStatusChecked: true,
	}

	index = 0
	editing: any = {
		quantity: {
			1: false
		},
		adjusted: {
			1: false
		},
	} 

	products = []

	constructor(
		public dialogRef: MatDialogRef<TaskAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private service: TxcrmService,
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		
		if(this.data.order){
			this.order = this.data.order
			this.order.invoiceStatusChecked = this.order.invoiceStatus > 0
			console.log(this.order)
		}
	
		this.service.getProduct({}).subscribe((res)=>{
			console.log(res)
			this.products = res
			if(!this.data.order){
				this.addOrderItem()
			}
		}, (error) => {
			console.log(error)
		})
	}

	addOrderItem(){
		this.index++
		this.order.orderItems = this.order.orderItems.concat([
			{
				index: this.index,
				quantity: 1,
				adjusted: 0,
				invalid: false,
			}
		])
		this.editing.quantity[this.index] = false
		this.editing.adjusted[this.index] = false
		console.log(this.order.orderItems)
	}

	removeOrderItem(orderItem){
		let i = this.order.orderItems.indexOf(orderItem)
		this.order.orderItems.splice(i, 1)
		this.order.orderItems = this.order.orderItems.concat([])
	}

	getNetTotal() {
		let net = 0;
		this.order.orderItems.forEach(element => {
			if(element.product && element.product.price){
				net += element.product.price * element.quantity - element.adjusted
			}
		});
		return net;
	}

	save(){
		console.log(this.order)
		if(this.order.invoiceStatusChecked){
			this.order.invoiceStatus = 1
		}else{
			this.order.invoiceStatus = 0
		}

		this.service.saveOrder(this.order).subscribe((res)=>{
			console.log(res)
			this.dialogRef.close('refesh');
		}, (error) => {
			console.log(error)
		})
	}

}
