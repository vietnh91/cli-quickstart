import { Component, Inject, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
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

	orderItems: any = [];

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
		@Inject(MAT_DIALOG_DATA) public order: any,
		private orderService: OrderService,
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		this.orderService.getProduct({}).subscribe((res)=>{
			console.log(res)
			this.products = res
			this.addOrderItem()
		}, (error) => {
			console.log(error)
		})
	}

	filter(){
		this.focus = true
		this.options = [
			{
				customerId: 1,
				customerName: 'Vacation Itinerary',
				updated: new Date('2/20/16'),
			},
			{
				customerId: 1,
				customerName: 'Kitchen Remodel',
			  	updated: new Date('1/18/16'),
			}
		];
	}

	select(option){
		this.focus = false
		console.log(option)
		this.selected = option
		this.order.customerId = option.customerId
		this.order.customerName = option.customerName
	}

	focusout(){
		this.focus = false
		if(this.order.customerId 
			&& this.order.customerId == this.selected.customerId 
			&& this.order.customerName != this.selected.customerName)
			{
				this.selected = {}
				this.order.customerId = null
		}
		console.log(this.order)
	}

	addOrderItem(){
		this.index++
		this.orderItems = this.orderItems.concat([
			{
				index: this.index,
				quantity: 1,
				adjusted: 0,
				invalid: false,
			}
		])
		this.editing.quantity[this.index] = false
		this.editing.adjusted[this.index] = false
		console.log(this.orderItems)
	}

	removeOrderItem(orderItem){
		let i = this.orderItems.indexOf(orderItem)
		this.orderItems.splice(i, 1)
		this.orderItems = this.orderItems.concat([])
	}

	getNetTotal() {
		let net = 0;
		this.orderItems.forEach(element => {
			if(element.product && element.product.price){
				net += element.product.price * element.quantity - element.adjusted
			}
		});
		return net;
	}

}
