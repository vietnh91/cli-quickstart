import { Component, OnInit } from '@angular/core';
import { TxcrmService } from 'src/app/service/txcrm.service';
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
		private service: TxcrmService,
	) { }

	ngOnInit() {
		this.filter()
	}
	
	dataSource = []

	paging: any = {
		length: 100,
		size: 20,
		page: 0,
		options: [10, 20, 50, 100],
	}

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
			if(result == 'refesh'){
				this.filter()
			}
		});
	}

	jsonCopy(src) {
		return JSON.parse(JSON.stringify(src));
	}

	openUpdate(order){
		const dialogRef = this.dialog.open(TaskAddComponent, {
			height: '600px',
			width: '1000px',
			data: {
				order: this.jsonCopy(order)
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'refesh'){
				this.filter()
			}
		});
	}

	filter(){
		this.service.filterOrder({
			size: this.paging.size,
			page: this.paging.page,
		}).subscribe( (res) => {
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

		this.service.countOrder({
			//size: this.paging.size,
			//page: this.paging.page,
		}).subscribe( (res) => {
			console.log(res)
			this.paging.length = parseInt(res)
		}, (error) => {
			console.log(error);
		})
	}

	pageEvent($event){
		console.log($event)
		this.paging.page = $event.pageIndex
		this.filter()
	}
}
