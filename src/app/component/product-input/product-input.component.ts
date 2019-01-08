import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'product-input',
	templateUrl: './product-input.component.html',
	styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent implements OnInit {

	focus = false
	selected: any = {}

	@Input() options: any[]
	@Input() orderItem: any = {}
	@Input() default: any = {}
	
	filteredOptions: any[]

	ngOnInit() {

		if(this.default && this.default.productName){
			this.selected = Object.assign({}, this.default)
		}

		this.options.forEach(element => {
			element.fullTextSearch = this.xoa_dau(element.productName) + this.xoa_dau(element.productCode)
		});
	}

	filter() {
		
		if(!this.selected.productName || this.selected.productName.length < 2){
			this.focus = false
			this.filteredOptions = []
			return
		}

		const filterValue = this.xoa_dau(this.selected.productName);

		this.filteredOptions = this.options.filter(option => {
			return option.fullTextSearch 
				&& option.fullTextSearch.indexOf(filterValue) > -1
		});
		
		this.focus = true
		console.log(this.filteredOptions)
		console.log(this.focus)
	}
	
	select(option){
		this.focus = false
		this.selected = option
		this.orderItem.product = Object.assign({}, this.selected)
	}

	focusout(){
		this.focus = false
		if(this.orderItem.product 
			&& this.orderItem.product.productId == this.selected.productId 
			&& this.orderItem.product.productName != this.selected.productName)
			{
				this.selected = {}
				this.orderItem.invalid = true
		}
		console.log(this.orderItem)
	}

	xoa_dau(str) {
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replace(/đ/g, "d");
		str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
		str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
		str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
		str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
		str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
		str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
		str = str.replace(/Đ/g, "D");
		str = str.toLowerCase()
		return str;
	}

}
