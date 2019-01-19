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
		var url: string = this.url + '/order/filter';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	countOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/count';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}

	saveOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/save';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	getProduct(condition: Object) : Observable<any>{
		var url: string = this.url + '/product/filter';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	filterCustomer(condition: Object) : Observable<any>{
		var url: string = this.url + '/customer/filter';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	

}
