# adesso-FrontendTask

## Übersicht

Aufgabe war es, ein Frontend mit Angular zu entwickeln, das ein einfaches Formular mit mindestens einem Textfeld und einem Button bereitstellt. Die abgeschickten Eingaben sollten in einer Historie gespeichert werden, die auch nach einem erneuten Laden der Seite erhalten bleibt. Änderungen am State sollten in der Browserkonsole ausgegeben, die aktuellen Eingaben per REST-Schnittstelle an das Backend gesendet und die Antwort des Backends im Frontend angezeigt werden.
Diese finale Frontend-Anwendung wurde mit Angular entwickelt und stellt eine benutzerfreundliche Oberfläche zur Verfügung, die es Benutzern ermöglicht, Text-Eingaben zu machen, diese an ein Backend zu senden und eine persistente Historie zu verwalten. Die Anwendung wurde um weitere Funktionen zur Verwaltung der Eingabehistorie erweitert und zeigt Historie und Antworten des Backend benutzerfreundlich an.

## Features

- **Text-Eingabe**: Einfaches Formular mit Input-Feld und Submit-Button
- **Backend-Integration**: REST-API Kommunikation mit dem Backend-Server
- **Persistente Historie**: Speicherung der Eingaben im localStorage (überlebt Seitenrefresh)
- **Anzeige der Historie**: Eingabeverlauf wird auf der Seite angezeigt
- **Server-Status**: Anzeige des Backend-Verbindungsstatus mit Refresh-Funktion
- **Selektive Löschung**: Auswahl und Löschung einzelner Historieneinträge
- **Eintragszähler**: Anzeige der aktuellen Anzahl gespeicherter Einträge
- **Snackbar-Notifications**: Visuelle Bestätigung der Backend-Antworten


## Installation

1. **Node.js und npm installieren**

2. **Repository klonen und ins Verzeichnis wechseln:**
   ```bash
   cd adesso-FrontendTask
   ```

3. **Dependencies installieren:**
   ```bash
   npm install
   ```

4. **Angular CLI global installieren** (falls noch nicht vorhanden):
   ```bash
   npm install -g @angular/cli
   ```

## Verwendung

### Entwicklungsserver starten

```bash
npm start
# oder
ng serve
```

Die Anwendung läuft standardmäßig auf `http://localhost:4200`

## Anwendungsfunktionen

### Hauptfunktionen

1. **Text-Eingabe und Übertragung**
   - Eingabe von Text über ein Formular
   - Übertragung an Backend via POST-Request
   - Anzeige der Backend-Antwort in Snackbar

2. **Historie-Verwaltung**
   - Automatische Speicherung aller Eingaben
   - Persistierung im localStorage
   - Eindeutige IDs für jeden Eintrag

3. **Selektive Löschung**
   - Checkbox-Auswahl für einzelne Einträge
   - Batch-Löschung ausgewählter Einträge
   - Komplette Historie-Löschung

4. **Server-Status-Monitoring**
   - Live-Verbindungsstatus zum Backend
   - Refresh-Button für manuelle Statusprüfung
   - Visuelle Indikatoren (🟢/🔴)

### Backend-Integration

Die Anwendung kommuniziert mit dem Backend auf `http://localhost:5000`:

- **POST /api/text**: Sendet Text-Eingaben an den Server
- **GET /api/status**: Überprüft den Server-Status


## Benutzeroberfläche

### Header
- **Titel**: "Meine Liste"
- **Navigation**: Home- und Über-Links
- **Willkommensnachricht**

### Hauptbereich
- **Eingabeformular**: Text-Input mit Submit-Button
- **Historie-Liste**: Darstellung aller Einträge mit Checkboxen
- **Aktionen**: Buttons für selektive und komplette Löschung
- **Zähler**: Anzeige der aktuellen Eintragsanzahl

### Footer
- **Server-Status**: Live-Anzeige der Backend-Verbindung
- **Refresh-Button**: Manuelle Statusaktualisierung


## Backend-Abhängigkeiten

Diese Frontend-Anwendung benötigt das entsprechende Backend (`adesso-BackendTask`):

