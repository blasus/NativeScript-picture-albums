import { Component, OnInit } from "@angular/core";
import { firebase } from "@nativescript/firebase";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit { 

    ngOnInit(): void {
        // initialise firebase cloud.
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
		    // see their respective docs.
        })
        .then(
            instance => {
                console.log('firebase.init done!');
            },
            error => {
                console.log(`firebase.init eror: ${error}`);
            }
        )
    }
}
