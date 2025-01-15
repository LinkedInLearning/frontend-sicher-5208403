# Ausführen einer Cross Site Request Forgery Attacke

## Setup

#### OWASP Juice Shop
Um diese Attacke ausführen zu können müssen Sie die Anwendung [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) auf Ihrem Rechner ausführen.
1. Dazu können Sie den Quellcode von GitHub entweder als Zip-Datei herunterladen oder das gesamte Repository clonen:
`git clone https://github.com/juice-shop/juice-shop.git --depth 1`
2. Wechslen Sie in den geklonten Ordner: `cd juice-shop`
3. Installieren Sie die Abhängigkeiten mit `npm install` (Das muss nur vor dem ersten Start oder bei Änderungen der Abhänigkeiten gemacht werden). Das kann eine Weile dauern und gegebenenfalls erhalten Sie einige Warnungen in der Konsole über veraltete Pakete. Dies ist aber bewusst, da diese Anwendung ganz bewusst voller Sicherheitslücken implementiert wurde um diese zu demonstrieren.
4. Starten Sie die Anwendung mit `npm start`
5. Öffnen Sie einen Browser und geben Sie folgende URL ein: [http://localhost:3000](http://localhost:3000)

#### WebServer des Angreifers/der Angreiferin

1. Navigieren Sie innerhalb der Kursdateien zu dem Ordner `src/03_02/Server` mit.
2. Installieren Sie die Abhängigkeiten mit `npm install`
3. Starten Sie die Anwendung mit `npm start`

Der Web Server welches die bösartige HTML-Datei ausliefert ist nun unter [http://localhost:1111](http://localhost:1111) erreichbar, aber zuvor müssen wir im OWASP Juice Shop eine/n Nutzer:in anlegen.

#### Ausführen der Attacke

1. Registrieren Sie eine/n Nutzer:in in Ihrem OWASP Juice Shop.
2. Besuchen Sie ihr eigenes Profil nach erfolgreichem Einloggen: [http://localhost:3000/profile](http://localhost:3000/profile) und setzen Sie einen Nutzernamen.
3. Verlassen Sie das Profil (es ist allerdings wichtig, dass Sie die Sitzung weiterhin offen halten und sich nicht von dem OWASP Juice Shop abmelden
4. Öffnen Sie nun einen weiteren Tab in ihrem Web Browser und besuchen Sie die Webseite [http://localhost:1111](http://localhost:1111)
5. Wenn Sie nun Ihr Profil erneut besuchen [http://localhost:3000/profile](http://localhost:3000/profile), sollten Sie sehen, dass sich der Nutzername geändert hat und die CSRF-Attacke erfolgreich war.






