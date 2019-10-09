import { Component, Inject, OnInit } from '@angular/core';
import { TxcrmService } from 'src/app/service/txcrm.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddressAddComponent } from '../address-add/address-add.component';

@Component({
	selector: 'app-order-add',
	templateUrl: './order-add.component.html',
	styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

	options = []
	focus = false
	selected: any = {}

	displayedColumns: string[] = ['productName', 'productCode', 'quantity', 'price', 'itemTotal', 'adjusted', 'netTotal', 'action'];
	footerColumns: string[] = ['productName', 'productCode', 'quantity', 'price', 'itemTotal', 'adjusted', 'netTotal', 'action'];

	order: any = {
		customer: {
			customerId: 0,
			name: '',
			address: ''
		},
		ship: {
			address: '',
			phone: ''
		},
		newShip: {},
		ships: [],
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
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<OrderAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private service: TxcrmService,
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {

		if (this.data.order) {
			this.order = this.data.order
			this.order.invoiceStatusChecked = this.order.invoiceStatus > 0
			console.log(this.order)
		}

		this.service.getProduct({}).subscribe((res) => {
			console.log(res)
			this.products = res
			if (!this.data.order) {
				this.addOrderItem()
			}
		}, (error) => {
			console.log(error)
		})
	}

	addOrderItem() {
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

	removeOrderItem(orderItem) {
		let i = this.order.orderItems.indexOf(orderItem)
		this.order.orderItems.splice(i, 1)
		this.order.orderItems = this.order.orderItems.concat([])
	}

	getNetTotal() {
		let net = 0;
		this.order.orderItems.forEach(element => {
			if (element.product && element.product.price) {
				if (element.adjusted > 1 || element.adjusted < 0) {
					net += element.product.price * element.quantity - element.adjusted
				} else {
					net += element.product.price * element.quantity * (1 - element.adjusted)
				}
			}
		});
		return net;
	}

	shipSelected(shipItem) {
		if (this.order.ship.addressId == shipItem.addressId) {
			this.order.ship = {}
		} else {
			this.order.ship = shipItem
		}
	}

	save() {
		console.log('this.order.1', this.order)
		if (this.order.invoiceStatusChecked) {
			this.order.invoiceStatus = 1
		} else {
			this.order.invoiceStatus = 0
		}
		if (!this.order.ship.addressId) {
			this.order.ship = this.order.newShip
		}

		this.order.orderItems.forEach(element => {
			if (element.product && element.product.price) {
				if (element.adjusted < 1 && element.adjusted > 0) {

					if (this.order.note) {
						this.order.note = this.order.note + ', adjusted ' + (element.adjusted * 100) + '%'
					} else {
						this.order.note = 'Adjusted ' + (element.adjusted * 100) + '%'
					}

					element.adjusted = element.adjusted * element.product.price * element.quantity

				}
				element.productId = element.product.productId
			}
		});
		
		console.log('this.order', this.order)

		this.service.saveOrder(this.order).subscribe((res) => {
			console.log(res)
			this.dialogRef.close('refesh');
		}, (error) => {
			console.log(error)
		})
	}


	openAddAddress() {
		if (!this.order.customer.name && !this.order.customer.customerId) {
			alert('Không tìm thấy khách hàng')
			return
		}
		const dialogRef = this.dialog.open(AddressAddComponent, {
			height: '400px',
			width: '1000px',
			data: {
				//name: this.name,
				customer: this.order.customer
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result > 0) {
				if (!this.order.customer.customerId) {
					this.order.customer.customerId = result
				}

				this.service.filterAddress({
					customerId: result
				}).subscribe(res => {

					console.log('filterAddress', res)
					this.order.ships = res
					if (this.order.ships.length > 0) {
						this.order.ship = this.order.ships[this.order.ships.length - 1]
					}
				}, err => {
					console.log(err)
				})
			}
		});
	}

}
