// Emplacement pour une future logique centralisée : appels API de fact-checking,
// synchronisation, notifications, etc. Vide pour l'instant en v1 tout-local.

chrome.runtime.onInstalled.addListener(() => {
  console.log("MIL Education extension installée.");
});
