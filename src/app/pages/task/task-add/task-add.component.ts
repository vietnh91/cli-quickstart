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

	products = [];

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

	displayedColumns: string[] = ['productName', 'quantity', 'price', 'itemTotal', 'action'];

	orderItems: any = [];
  
	/** Gets the total cost of all transactions. */
	getTotalCost() {
	  return this.orderItems.map(t => t.price).reduce((acc, value) => acc + value, 0);
	}

	index = 0

	addOrderItem(){
		this.index++
		this.orderItems = this.orderItems.concat([
			{
				index: this.index,
				quantity: 1
			}
		])
		console.log(this.orderItems)
	}

	changeProduct(orderItem, productId){
		console.log(orderItem)
		console.log(productId)
		this.products.forEach(element=>{
			if(element.productId == productId){
				orderItem.product = element
			}
		})
		console.log(orderItem)
	}

}
