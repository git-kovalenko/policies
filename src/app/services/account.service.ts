import { Injectable } from '@angular/core';
import {Jsonp, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import {CustomQueryEncoderHelper} from "../extends/custom-query-encoder-helper";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AccountService {
  private getPoliciesURL = 'https://accounts.gigya.com/accounts.getPolicies';
  private setPoliciesURL = 'https://accounts.gigya.com/accounts.setPolicies';
   searchParams = {
     userkey : 'AJA3Cw9XcJZf',
     secret: '1J+YxAY47khnuXf4GKSggLpPFBbQv8Hq',
     apikey : '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK',
     format : 'jsonp',
     callback : 'JSONP_CALLBACK'
   };
  constructor(private jsonp:Jsonp) {}

  getPolicies(): Observable<object> {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params = new URLSearchParams('', new CustomQueryEncoderHelper());
    for(let param of Object.keys(this.searchParams)){
      params.set(param, this.searchParams[param])
    }

    let options = new RequestOptions({
      headers: headers,
      params: params
    });
    return this.jsonp.get(this.getPoliciesURL, options)
      .map( (response) => {
        return response.json();
      });
  }

  setPolicies(policies): Observable<object> {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params = new URLSearchParams('', new CustomQueryEncoderHelper());
    for(let param of Object.keys(this.searchParams)){
      params.set(param, this.searchParams[param])
    }

    for(let policy of Object.keys(policies)){
      params.set(policy, JSON.stringify(policies[policy]) )
    }

    let options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.jsonp.get(this.setPoliciesURL, options)
      .map( (response) => {
        return response.json();
      });
  }

}
