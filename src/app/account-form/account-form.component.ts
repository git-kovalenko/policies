import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  title = 'Account options';
  policies: Object = {};
  submitResponse: object = {};
  userAccountOptions: Object = {};
  private loginIdentifiersConflict = ['ignore', 'failOnSiteConflictingIdentity', 'failOnAnyConflictingIdentity'];
  private disableFields: boolean;
  private spinner: boolean;
  constructor(private accountService: AccountService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPolicies();
    this.route.data.subscribe((data) => {
        this.disableFields = data.disableFields;
      });
  }

  determineInputType(option: any) {
    switch (typeof option.value ){
      case 'boolean': return 'checkbox';
      case 'string':
        switch (option.key) {
          case 'loginIdentifierConflict': return option.key;
          default: return 'text';
        }
      default: return option.key;
    }
  }
  onSubmit() {
    let payload = {
      accountOptions:{}
    };

    Object.keys(this.userAccountOptions).forEach((option)=>{
      if(this.userAccountOptions[option] != this.policies['accountOptions'][option]){
        payload.accountOptions[option] = this.userAccountOptions[option];
      }
    });

    if(Object.keys(payload.accountOptions).length ) {
      this.spinner = true;
      this.accountService.setPolicies(payload).subscribe((response) => {
        this.submitResponse = response;
        this.spinner = false;
        this.getPolicies();
      });
    }
  }
  getPolicies() {
    this.accountService.getPolicies().subscribe((response) => {
      this.policies = response;
      this.userAccountOptions = Object.assign({}, response['accountOptions']);
    });

  }
}
