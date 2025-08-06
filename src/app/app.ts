import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Header } from './header/header';
import {MatDividerModule} from '@angular/material/divider';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css'],
  imports: [FormsModule, Header, MatDividerModule],
})

export class App implements OnInit {

  input = '';
  history: [number, string][] = []; // Stored as tuples to provide a unique identifier for each entry
  counter = 0; // Counter for the number of entries in the history
  deleteArr: [number, string][] = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {} // Inject PLATFORM_ID to check if the code is running in the browser - modified by Copilot

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedHistory = localStorage.getItem('history');
      if (storedHistory) {
        this.history = JSON.parse(storedHistory);
        console.log('Verlauf geladen:', this.history);
      }
    }
    this.counter = this.countEntries();
  }

  /**
   * Submits the form input and adds it to the history.
   * If the input is empty, it does nothing.
   * It also sends the input to a backend API and logs the response.
   */
  submitForm() {
    if (this.input) {
      const id  =  this.history.length > 0 ? this.history.length+1 : 0;
      this.history.push([id, this.input]);

      if (isPlatformBrowser(this.platformId)) { //check added by Copilot - LocalStorage was working but constantly gave an error message. Copilot suggested this check
        localStorage.setItem('history', JSON.stringify(this.history));
      }
      console.log('Text aus Input:', this.input);
      console.log('Historie:', this.history);

      this.http.post<{ reply: string }>('http://localhost:5000/api/text', { text: this.input })
        .subscribe(response => {
          console.log('Antwort vom Backend:', response.reply);
        });

      this.input = '';
    }
    this.counter = this.countEntries();
  }

  /**
   * Counts the number of entries in the history.
   * @returns The count of entries.
   */
  countEntries(){
    const count  = this.history.length;
    console.log(`Anzahl der Einträge im Verlauf: ${count}`);
    return count;
  }

  /**
   * Clears the entire history and removes it from localStorage.
   */
  clearHistory() {
    this.history = [];
    if (isPlatformBrowser(this.platformId)) { //check added by Copilot
      localStorage.removeItem('history');
    }
    console.log('Verlauf gelöscht');
    this.counter = this.countEntries();
  }

  /**
   * Deletes selected items from the history.
   * If no items are selected, it logs a message and does nothing.
   */
  deleteSelected() {
    if (this.deleteArr.length === 0) {
      console.log('Keine Einträge zum Löschen ausgewählt.');
      return;
    }

    // delete selected items from history
    for (const item of this.deleteArr) {
      const index = this.history.indexOf(item); // find index of item in history
      if (index > -1) {
        this.history.splice(index, 1); // remove item from history
      }
    }
    if (isPlatformBrowser(this.platformId)) { //check added by Copilot
      localStorage.setItem('history', JSON.stringify(this.history)); // update localStorage with new history
    }
    this.deleteArr = []; // clear delete array after deletion
    console.log('Ausgewählte Einträge gelöscht:', this.deleteArr); 
    this.counter = this.countEntries();
  }

  /**
   * Selects or deselects an item for deletion.
   * If the item is already selected, it will be removed from the delete array.
   * Otherwise, it will be added to the delete array.
   * @param item The item to select or deselect.
   */
  selectItem(item: [number, string]) {
    if (this.deleteArr.includes(item)) {
      this.deleteArr = this.deleteArr.filter(i => i !== item);
      console.log('Eintrag abgewählt:', item);
    } else {
      console.log('Ausgewählter Eintrag:', item);
      this.deleteArr.push(item);
    }
  }
}
