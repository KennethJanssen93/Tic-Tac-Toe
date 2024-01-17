let fields = [ //Array für das Spielfeld.
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const WINNING_COMBINATIONS = [ //Alle möglichen Kombinationen um zu gewinnen als Array.
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal.
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical.
    [0, 4, 8], [2, 4, 6], //diagonal.
];

let currentPlayer = 'circle'; // definiert den Spieler der derzeit am Zug ist.

function init() { //Init Funktion.
    render(); //render Funktion wird ausgeführt.
    playerOnTurn();
}

function render() { //erstellt das Spielfeld als sichtbares HTML element.
    const contentDiv = document.getElementById('content'); //greift auf das div mit der ID 'content' zu.

    let tableHtml = '<table>'; // erstellen eines <table> elementes.
    for (let i = 0; i < 3; i++) { //for Schleife für die horizontalen Spalten.
        tableHtml += '<tr>'; // erstellen des <tr> elements.
        for (let j = 0; j < 3; j++) { //for Schleife für die vertikalen Zeilen.
            const index = i * 3 + j; // weißt Index die größen von 'i' und 'j' zu.
            let symbol = ''; // Der Inhalt der Variable 'symbol' wird leer dargestellt.
            if (fields[index] === 'circle') { // if Abfrage welches feld 'index' dem Array "fields" zugeteilt wird und ob 'circle' true ist. also ob der Spieler circle am Zug ist.
                symbol = generateCircleSVG(); // der Variable 'symbol' wird die Funktion "generateCircleSVG()" zugeordnet.
            } else if (fields[index] === 'cross') { //else mit gleicher if Abfrage wie vorher nur diesmal ob 'cross' am Zug ist.
                symbol = generateCrossSVG(); // der Variable 'symbol' wird nun die Funktion "generateCrossSVG()" zugeordnet.
            }
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`; //dem <table> tag wird nun ein <td oncklick> element zugeordnet mit den Inhalten aus 'index' und 'symbol'.
        }
        tableHtml += '</tr>'; // hier wird das <tr> Element wieder geschlossen.
    }
    tableHtml += '</table>'; // hier wird das <table> Element wieder geschlossen.

    contentDiv.innerHTML = tableHtml; // contentDiv greift auf das hinterlegte HTML Element zu und fügt diesem den Inhalt aus "tableHTML" hinzu.
}


function restartGame() { // Dies Funktion setzt das Array zurück und führt die render() funktion erneut aus.
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    currentPlayer = 'circle';
    render();
    playerOnTurn();
}

function handleClick(cell, index) { //existiert das Feld?
    if (isGameFinished()) { //Abfrage ob das Spiel beendet wurde.
        return; //Beendet die Funktion, wenn die if abfrage True ist. Also wenn das Spiel beendet ist.
    }

    if (fields[index] === null) { //NUR wenn das Feld nicht gefüllt ist
        fields[index] = currentPlayer; //der Inhalt von "currentPlayer" wird dem array an der bestimmten Stelle 'index' hinzugefügt.
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG(); //Verkürzte Schreibweise einer If-else Abfrage.
        cell.onclick = null; //Das onclick wird entfernt, damit ein Feld nicht doppelt genutzt werden kann.
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; //Der aktuelle Spieler ändert sich zu dem andern.

        if (isGameFinished()) { //Abfrage ob das Spiel vorbei ist.
            const winCombination = getWinningCombination(); // Der Variable "winCombination" wird der Inhalt aus der Funktion 'getWinningCombination()' hinzugefügt.
            drawWinningLine(winCombination); // Die Funktion 'drawWinningLine()' mit übertragung der Variable "winCombination" wird ausgeführt.
            console.log
        }
    }
    playerOnTurn(currentPlayer); //ausführen der Funktion.
}

function isGameFinished() { //Testen ob das Spiel vorbei ist, oder nicht.
    return fields.every((field) => field !== null) || getWinningCombination() !== null; //schauen ob freie Felder da sind, wenn nicht Winning Combination prüfen.
}

function getWinningCombination() { // Funktion prüft ob es eine Gewinnkombination gibt.
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) { //for schleife für jedes Element in dem Array "WINNING_COMBINATIONS".
        const [a, b, c] = WINNING_COMBINATIONS[i]; // den Variablen a, b und c werden die Werte des Array's hinzugefügt.
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) { // Abfrage ob die Werte von a, b und c gleich sind und ob diese nicht leer sind.
            return WINNING_COMBINATIONS[i]; // Ausgabe der 3 Werte aus dem Array, wenn die if-Abfrage true ist.
        }
    }
    return null; // Anzeige dass keine Gewinnkombination gefunden wurde, wenn die if-Abfrage false ist.
}

function generateCircleSVG() { //Funktion um einen Kreis zu generieren.
    const color = '#B0B0EF'; //Farbe vom Kreis.
    const width = 70; // Breite vom Kreis.
    const height = 70; // Höhe vom Kreis.
    //untenliegend die der svg Code um einen Kreis visuell darzustellen.
    return `<svg width="${width}" height="${height}">
                <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                    <animate attributeName="stroke-dasharray"
                    from="0 188.5" to="188.5 0" dur="100ms" fill="freeze"/>
                </circle>
            </svg>
    `;
}

function generateCrossSVG() { // Funktion um das Kreuz zu generieren.
    const color = '#FFC000'; // Farbe vom Kreuz.
    const width = 70; // Breite vom Kreuz.
    const height = 70; // Höhe vom Kreuz.
    // untenliegend der svg Code um einen Kreuz visuell darzustellen.
    const svgHtml = `
    <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
            stroke="${color}" stroke-width="5">
            <animate attributeName="x2" values="0; ${width}" dur="100ms"/>
            <animate attributeName="y2" values="0; ${height}" dur="100ms"/>
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
            stroke="${color}" stroke-width="5">
            <animate attributeName="x2" values="${width}; 0" dur="100ms"/>
            <animate attributeName="y2" values="0; ${height}" dur="100ms"/>
        </line>
    </svg>
    `;

    return svgHtml;
}

function drawWinningLine(combination) { //Funktion zum zeichnen einer Linie der gewonnenen Objekte.
    const lineColor = '#ffffff'; // Farbe der Linie.
    const lineWidth = 5; //Breite der Linie.

    const startCell = document.querySelectorAll(`td`)[combination[0]]; // Legt den Startpunkt für die Linie im <td> Element fest.
    const endCell = document.querySelectorAll(`td`)[combination[2]]; // Legt den Endpunkt für die Linie im <td> Element fest.
    const startRect = startCell.getBoundingClientRect(); // Die Position von "startCell" wird der Variable "startRect" zugeordnet.
    const endRect = endCell.getBoundingClientRect(); // Die Position von "endCell" wird der Variable "endRect" zugeordnet.

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt( //ausrechnen der Länge der Linie.
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left); //Winkel der Linie ausrechnen.

    const line = document.createElement('div');
    line.style.position = 'absolute'; // Position der linie.
    line.style.width = `${lineLength}px`; // Länge der Linie.
    line.style.height = `${lineWidth}px`; // Breite der Linie.
    line.style.backgroundColor = lineColor; // Farbe der Linie.
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`; // Abstand nach Oben.
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`; // Abstand nach unten.
    line.style.transform = `rotate(${lineAngle}rad)`; // Rotieren der Linie.
    line.style.transformOrigin = `top left`; // Rotationsstart oben links.
    document.getElementById('content').appendChild(line); 
}

function playerOnTurn() { // Funktion zum anzeigen wer am Zug ist.
    let playerOnTurn = document.getElementById('playerOnTurn'); // id 'playerOnTurn' wird der Variable playerOnTurn zugewiesen.
    playerOnTurn.innerHTML = ''; // Der Inhalt der Variable 'playerOnTurn' wird leer dargestellt.
    if (currentPlayer === 'circle') { // Abfrage ob "currentPlayer" den Wert 'circle' hat.
        playerOnTurn.innerHTML += `Spieler am Zug: <div class="currentPlayer">${generateCircleSVG()}</div>`; // if 'circle' ist 'True': Ausgabe der Funktion "generateCircleSVG()"
    } else {
        playerOnTurn.innerHTML += `Spieler am Zug: <div class="currentPlayer">${generateCrossSVG()}</div>`; // if 'circle' ist 'True': Ausgabe der Funktion "generateCircleSVG()"
        
    } if (isGameFinished()) { // if Abfrage ob die Funktion "isGameFinished()" ausgeführt wird. Also ob das Spiel vorbei ist.
        whoWins(playerOnTurn); // Ausführung der Funktion whoWins mit übertragung der Variable 'playerOnTurn'.
    } else {
        return; //Funktion beenden, falls das Spiel noch nicht vorbei sein sollte.
    }
}

function whoWins(playerOnTurn) {
    playerOnTurn.innerHTML = ''; // Der HTML Inhalt von 'playerOnTurn' wird geleert.
    if (currentPlayer === 'circle') { // Abfrage ob "currentPlayer" den Wert 'circle' hat.
        playerOnTurn.innerHTML += `Gewonnen hat: <div class="currentPlayer">${generateCrossSVG()}</div>`; // zeigt im HTML Inhalt nun das Kreuz.
    } else {
        playerOnTurn.innerHTML += `Gewonnen hat: <div class="currentPlayer">${generateCircleSVG()}</div>`; // zeigt im HTML Inhalt nun den Kreis.
    }
}