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

	address: any = {
		customerId: 0,
		name: ''
	}

	ngOnInit(): void {

		if (this.data.customer && this.data.customer.customerId) {
			this.address.customerId = this.data.customer.customerId
		} else {
			this.address.name = this.data.customer.name
		}
	}


	save() {

		this.service.saveAddress(this.address).subscribe((res) => {
			console.log(res)
			if (res) {
				this.dialogRef.close(res);
			}
		}, (error) => {
			console.log(error)
		})
	}


}
