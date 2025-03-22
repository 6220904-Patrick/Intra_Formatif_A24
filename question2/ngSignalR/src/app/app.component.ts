import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    this.hubConnection!.on('UpdateNbUsers', (data) => {
      console.log(data);
      this.nbUsers = data;
    });

    this.hubConnection!.on('UpdatePizzaPrice', (data) => {
      console.log(data);
      this.pizzaPrice = data;
    });

    this.hubConnection!.on('UpdateMoney', (data) => {
      console.log(data);
      this.money = data;
    });

    this.hubConnection!.on('UpdateNbPizzasAndMoney', (data) => {
      console.log(data);
      this.nbPizzas = data[0];
      this.money = data[1];
    });
    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection
      .start()
      .then(() => {
        console.log('La connexion est active!');
        this.isConnected = true;
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err)
        this.isConnected = false;
      });

  }

  selectChoice(selectedChoice:number) {
    if (this.isConnected) {
      this.selectedChoice = selectedChoice;
      this.hubConnection!.invoke('SelectChoice', selectedChoice)
        .catch(err => console.error('Error invoking SelectChoice:', err));
    } else {
      console.error("Not connected to the SignalR server");
    }
  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection!.invoke('AddMoney', this.selectedChoice);
  }

  buyPizza() {
    this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }
}
