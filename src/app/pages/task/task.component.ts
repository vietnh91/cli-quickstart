import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

	constructor(
		private orderService: OrderService,
	) { }

	ngOnInit() {
		this.filter()
	}
	
	dataSource = []

	length = 100;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];

	add(){
		let addItem = [
			{
				position: 0,
				name: 'untitled',
				products:
				[
					{
						productId: 1,
						productName: 'bánh chuối'
					},
				]
			},
		]
		
		this.dataSource = addItem.concat(this.dataSource)
	}

	filter(){
		this.orderService.filter({}).subscribe( (res) => {
			console.log(res)
			this.dataSource = res.content
		}, (error) => {
			console.log(error);
		})
	}
}
