import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';
@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	public searchControl: FormControl;
	@ViewChild("search")
	public searchElementRef: ElementRef;
	env = environment;

	constructor(
        private titleService: Title
    ) {
		this.env.isLoggedIn = true;
        this.env.goBack = false;
    	document.body.className = "page page-home page-contact";
	}

	ngOnInit() {
        this.titleService.setTitle("API-info");
        //create search FormControl
        this.searchControl = new FormControl();
    }

    onSubmit(){
		console.log('this a search test');
	}

}
