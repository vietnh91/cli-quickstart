import { Component, OnInit } from '@angular/core';
import { TxcrmService } from 'src/app/service/txcrm.service';
import { MatDialog } from '@angular/material';
import { OrderAddComponent } from './order-add/order-add.component';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

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

	openAdd() {
		const dialogRef = this.dialog.open(OrderAddComponent, {
			height: '800px',
			width: '1000px',
			data: {
				//name: this.name,
				//animal: this.animal
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'refesh') {
				this.filter()
			}
		});
	}

	jsonCopy(src) {
		return JSON.parse(JSON.stringify(src));
	}

	openUpdate(order) {

		this.service.filterAddress({
			customerId: order.customer.customerId,
		}).subscribe(res => {
			order.ships = res
			order.newShip = {}
			if (!order.ship) {
				order.ship = {}
			}

			const dialogRef = this.dialog.open(OrderAddComponent, {
				height: '800px',
				width: '1000px',
				data: {
					order: this.jsonCopy(order)
				}
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result == 'refesh') {
					this.filter()
				}
			});

		}, err => {
			console.log(err)
		})

	}

	filter() {
		this.service.filterOrder({
			size: this.paging.size,
			page: this.paging.page,
		}).subscribe((res) => {
			console.log(res)
			this.dataSource = []
			let list = [];
			let prevId = "";
			let row: any = {};
			res.forEach(item => {

				if (!prevId || prevId != item.orderId) {
					row = {};
					row = Object.assign(item, {})
					row.items = [
						item
					]
					list.push(row)
				}else{
					row.items.push(item)
				}
				prevId = item.orderId
			});

			
			console.log(list);
			this.dataSource = list
			this.dataSource.forEach(order=>{
				order.total = 0
				order.items.forEach(item => {
					order.total += item.price * item.quantity - item.adjusted
				});
			})
			
		}, (error) => {
			console.log(error);
		})

		this.service.countOrder({
			//size: this.paging.size,
			//page: this.paging.page,
		}).subscribe((res) => {
			console.log(res)
			this.paging.length = parseInt(res.count)
		}, (error) => {
			console.log(error);
		})
	}

	pageEvent($event) {
		console.log($event)
		this.paging.page = $event.pageIndex
		this.filter()
	}
}
