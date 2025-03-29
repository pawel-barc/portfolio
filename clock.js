// Création de graduation avec 60 unités réparties régulièrement sur le cadran
const markersContainer = document.getElementById("hour-markers-id");
for (let i = 0; i < 60; i++) {
  const marker = document.createElement("div");
  // 4 unités recevront une classe séparées(toutes les 15 minutes)
  marker.classList.add("hour-marker");
  if (i % 15 === 0) {
    marker.classList.add("thick-hour-marker");
  }
  // 12 unités recevront une classe séparées(toutes les 5 minutes)
  else if (i % 5 === 0) {
    marker.classList.add("middle-hour-marker");
  }
  // Applique la rotation à chaque unité
  marker.style.transform = `rotate(${i * 6}deg)`;
  markersContainer.appendChild(marker);
}

// Function qui gère la position exacte des aiguilles en fonction de l'heure actuelle,
//  et met à jour leur position pour simuler le mouvement naturel d'une montre
function updateTime() {
  const now = new Date();
  // Récupère l'heure au format 12 heures grâce au modulo
  const totalHours = now.getHours() % 12;
  //Récupère les minutes et les secondes
  const totalMinutes = now.getMinutes();
  const totalSeconds = now.getSeconds();
  // Sélectionne les éléments des aiguilles
  const hourHand = document.getElementById("hour-hand-id");
  const minuteHand = document.getElementById("minute-hand-id");
  const secondHand = document.getElementById("second-hand-id");

  // Calcule les angles des aiguilles pour leur position de départ
  const hoursDeg = totalHours * 30 + totalMinutes / 2; // 30° par heure + 0.5 par minute
  const minutesDeg = totalMinutes * 6 + totalSeconds * 0.1; // 6° par minute + 0.1 par seconde
  const secondDeg = totalSeconds * 6; // 6° par seconde

  // Applique les rotations aux aiguilles
  hourHand.style.transform = `rotate(${hoursDeg}deg)`;
  minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;
}
// Met à jour l'heure chaque seconde
setInterval(updateTime, 1000);
updateTime();

// Fonction qui gère le calendrier pour afficher la date actuelle
function setCurrentDate() {
  const today = new Date();
  const currentDate = today.getDate();

  const dateDisplay = document.getElementById("calendar-complication-id");
  if (dateDisplay) {
    dateDisplay.textContent = currentDate;
  }
}
setCurrentDate();

////////////////// Fonction qui gère la phase de la lune/////////////////////////////
function setMoonPhase() {
  // Définition de la date et de l'heure exactes de la nouvelle lune
  const newMoonDate = new Date(2024, 6, 5, 22, 57); // 5 Juillet 2024 à 22h57
  const now = new Date();
  // Nombre des jours ecoulés depuis le 5 Juillet
  const daysSinceNewMoon = (now - newMoonDate) / (1000 * 60 * 60 * 24);
  // Calcul de la phase lunaire actuelle (valeur entre 0 et 1)
  const phase = (daysSinceNewMoon % 29.53) / 29.53;

  let shadowPosition;
  // Si la phase est inférieure à 0.5, on simule la progression entre le premier quartier et la plaine lune
  if (phase < 0.5) {
    shadowPosition = 40 * (1 - phase * 2);
  } else {
    // Si la phase est supérieure à 0.5, on simule la progression entre la plaine lune et la nouvelle lune
    shadowPosition = 40 * ((phase - 0.5) * 2);
  }

  // Calcul de l'opacité de l'ombre (valeur entre 0 et 1)
  const shadowVisibility = Math.abs(phase - 0.5) * 2;

  // Application des valeurs CSS pour modifier l'affichage de la lune
  document.documentElement.style.setProperty(
    "--shadow-position",
    `${shadowPosition}px`
  );
  document.documentElement.style.setProperty(
    "--shadow-visibility",
    shadowVisibility
  );
}

// Mise à jour automatique toutes les minutes
setInterval(setMoonPhase, 60000);
setMoonPhase();

////////////////Fonction qui gère le petit cadran du jour ///////////////////////////////

const daysContainer = document.getElementById("days-container-id");
const daysDialMarkersContainer = document.getElementById(
  "days-dial-markers-id"
);

const days = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
// Calcul des angles entre chaque jour
const stepAngle = 360 / days.length;
days.forEach((day, i) => {
  const span = document.createElement("span");
  span.classList.add("day");
  span.style.setProperty("--angle", `${i * stepAngle}deg`); //Positionnement en rotation
  span.textContent = day;
  daysContainer.appendChild(span);
});
//Création des marqueurs (graduation) pour chaque jour
for (let i = 0; i < 7; i++) {
  const dayMarker = document.createElement("div");
  dayMarker.classList.add("day-marker");
  dayMarker.style.transform = `rotate(${i * stepAngle + 25.7}deg)`; // Placement des marqueurs
  daysDialMarkersContainer.appendChild(dayMarker);
}
// Fonction pour ajouster dynamiquement la taille de la police en fonction de la taille du cadran
function updateFontSize() {
  const dial = document.getElementById("days-dial-id");
  const dialSize = dial.offsetWidth;
  document.documentElement.style.setProperty("--dial-size", `${dialSize}px`); // Ajustement de la police
}
// Écouteur d'événement pour ajuster la taille de la police en cas de redimensionnement
window.addEventListener("resize", updateFontSize);
updateFontSize();

// Fonction pour indiquer le jour courant dans le petit cadran
function dayHandFocus() {
  const dayHand = document.getElementById("days-dial-hand-id");
  const now = new Date();
  let dayOfWeek = now.getDay(); // Le jour actuel de la semaine(0 - 6)
  // Ajuster l'index pour que le Lundi soit le jour 0 et Dimanche soit le jour 6
  dayOfWeek = (dayOfWeek + 6) % 7;
  const stepAngle = 360 / 7;
  const dayAngle = dayOfWeek * stepAngle;
  dayHand.classList.add("days-dial-hand");
  // Appliquer la transformation pour faire tourner l'aiguille du jour
  dayHand.style.transform = `rotate(${dayAngle}deg)`;
}
// Mise à jour de l'aiguille du jour chaque minute
setInterval(dayHandFocus, 60000);
dayHandFocus();
