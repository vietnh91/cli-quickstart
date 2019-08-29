import { Component, Inject, OnInit } from '@angular/core';
import { TxcrmService } from 'src/app/service/txcrm.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
	selector: 'app-address-add',
	templateUrl: './address-add.component.html',
	styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<AddressAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private service: TxcrmService,
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {


	}


	save() {
		// console.log(this.order)
		// if(this.order.invoiceStatusChecked){
		// 	this.order.invoiceStatus = 1
		// }else{
		// 	this.order.invoiceStatus = 0
		// }
		// if(!this.order.ship.addressId){
		// 	this.order.ship = this.order.newShip
		// }

		// this.order.orderItems.forEach(element => {
		// 	if(element.product && element.product.price){
		// 		if(element.adjusted < 1 && element.adjusted > 0){

		// 			if(this.order.note){
		// 				this.order.note = this.order.note + ', adjusted ' + (element.adjusted * 100) + '%'
		// 			}else{
		// 				this.order.note = 'Adjusted ' + (element.adjusted * 100) + '%'
		// 			}

		// 			element.adjusted = element.adjusted * element.product.price * element.quantity

		// 		}
		// 	}
		// });

		// this.service.saveOrder(this.order).subscribe((res)=>{
		// 	console.log(res)
		// 	this.dialogRef.close('refesh');
		// }, (error) => {
		// 	console.log(error)
		// })
	}


}
