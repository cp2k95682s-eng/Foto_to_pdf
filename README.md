# Foto → PDF (PWA mit OCR)

App, die Fotos zu einer PDF zusammenfasst. Der Dateiname besteht aus der per OCR ausgelesenen Maschinenkennzeichnung + heutigem Datum.

## Was die App kann

- 📸 Mehrere Fotos nacheinander aufnehmen oder aus Galerie wählen
- 🔍 Maschinenkennzeichnung per OCR aus dem ersten Foto erkennen (deutsch + englisch)
- 📄 Alle Fotos zu einer PDF zusammenfügen (eine Seite pro Foto, A4)
- 💾 PDF speichern mit Dateiname `Kennzeichnung_JJJJ-MM-TT.pdf`
- 📤 Per System-Share-Menü teilen (Mail, WhatsApp, AirDrop, Drive, …) – PDF ist direkt als Anhang dabei
- ✉️ Per Mail an gespeicherte Adresse senden
- 📴 **Offline-fähig** nach dem ersten Aufruf – keine Internetverbindung nötig
- 📱 Installierbar als App auf Home-Screen (iOS + Android)

## Dateien im Bündel

| Datei | Zweck |
|-------|-------|
| `index.html` | Haupt-App |
| `manifest.webmanifest` | App-Metadaten (Name, Icons, Farben) |
| `sw.js` | Service Worker für Offline-Betrieb |
| `icon-192.png`, `icon-512.png` | App-Icons |

## Installation

PWAs müssen über **HTTPS** ausgeliefert werden (Ausnahme: `localhost` zum Testen). Du brauchst also einen kleinen Webserver mit HTTPS.

### Variante 1: Kostenlos über GitHub Pages (empfohlen)

1. GitHub-Account anlegen (falls nicht vorhanden) – kostenlos
2. Neues Repository erstellen, z. B. `foto2pdf`
3. Alle Dateien (`index.html`, `manifest.webmanifest`, `sw.js`, beide PNGs) hochladen
4. In den Repo-Einstellungen → „Pages" → Branch `main` / Root → Speichern
5. Nach 1-2 Minuten erreichbar unter `https://DEIN-NAME.github.io/foto2pdf/`
6. Diese URL auf dem Handy öffnen

### Variante 2: Lokaler Webserver auf dem PC (zum Testen)

```bash
cd foto2pdf
python3 -m http.server 8080
```

Dann auf dem PC `http://localhost:8080` öffnen. Auf dem Handy geht das nicht ohne HTTPS – nimm Variante 1.

### Variante 3: Anderer Hosting-Dienst

Funktioniert auch mit Netlify (Drag&Drop), Vercel, Cloudflare Pages, eigenem Webserver mit HTTPS, NAS mit HTTPS etc. Einfach den Ordner hochladen.

## Auf dem Handy installieren

**iPhone (Safari):**
1. App-URL öffnen
2. Teilen-Button (Quadrat mit Pfeil nach oben) tippen
3. „Zum Home-Bildschirm" wählen
4. App-Icon erscheint wie eine echte App

**Android (Chrome):**
1. App-URL öffnen
2. Banner „Installieren" tippen, oder Menü (⋮) → „App installieren"
3. App-Icon im App-Drawer

## Offline-Nutzung

Beim **ersten Aufruf** mit Internet werden automatisch alle benötigten Daten geladen und gespeichert (~12 MB für OCR-Sprachdaten). Danach läuft die App komplett offline – auch wenn das Handy keinen Empfang hat.

Die OCR-Daten sind groß, weil sie deutsche und englische Schrift erkennen müssen. Sie werden nur einmal heruntergeladen.

## Datenschutz

- Alles bleibt lokal auf dem Gerät
- Keine Server-Kommunikation außer dem einmaligen Laden der Bibliotheken
- Fotos verlassen niemals das Handy (außer du teilst sie selbst)
- E-Mail-Adresse wird nur in `localStorage` deines Browsers gespeichert
