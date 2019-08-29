import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class TxcrmService {

	url = environment.url

	constructor(
		private http: HttpClient,
	) { }

	getHttpOption(){
		return {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'TXBEAR'
			})
		};
	}

	filterOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/list.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	countOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/count.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}

	saveOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/add.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	getProduct(condition: Object) : Observable<any>{
		var url: string = this.url + '/product/list.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	filterCustomer(condition: Object) : Observable<any>{
		var url: string = this.url + '/customer/list.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}

	filterAddress(condition: Object) : Observable<any>{
		var url: string = this.url + '/address/list.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	saveAddress(condition: Object) : Observable<any>{
		var url: string = this.url + '/address/edit.php';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	

}
