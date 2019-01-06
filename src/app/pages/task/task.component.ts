import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { MatDialog } from '@angular/material';
import { TaskAddComponent } from './task-add/task-add.component';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		private orderService: OrderService,
	) { }

	ngOnInit() {
		this.filter()
	}
	
	dataSource = []

	length = 100;
	pageSize = 10;
	pageEvent: any
	pageSizeOptions: number[] = [5, 10, 25, 100];

	editing: boolean = false

	openAdd(){
		const dialogRef = this.dialog.open(TaskAddComponent, {
			height: '600px',
			width: '1000px',
			data: {
				//name: this.name,
				//animal: this.animal
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed' + result);
			//this.animal = result;
		});
	}

	filter(){
		this.orderService.filter({}).subscribe( (res) => {
			console.log(res)
			this.dataSource = res.content
			this.dataSource.forEach(order=>{
				order.total = 0
				order.orderItems.forEach(item => {
					order.total += item.product.price * item.quantity - item.adjusted
				});
			})
		}, (error) => {
			console.log(error);
		})
	}

	edit(item){
		console.log(item)
	}


}
