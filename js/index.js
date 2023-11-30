console.clear();

const userElement = document.querySelector(".user");
const errorElement = document.querySelector(".error");

async function getUser(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user data. Error-Code: ${response.status}`
      );
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

document.querySelectorAll("button[data-url]").forEach((button) =>
  button.addEventListener("click", async (event) => {
    try {
      const user = await getUser(event.target.dataset.url);
      userElement.innerHTML = `
    <h2>${user.first_name} ${user.last_name}</h2>
    <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
    `;
      errorElement.textContent = "";
    } catch (error) {
      errorElement.textContent = error.message;
    }
  })
);

// Promise.reject(error):

// Ein Promise ist ein JavaScript-Objekt,
// das die eventuelle Erfüllung oder das Scheitern einer asynchronen Operation und ihren resultierenden Wert repräsentiert.

// Die reject-Methode signalisiert, dass die asynchrone Operation fehlgeschlagen ist,
// und Sie möchten einen Fehler als Grund für das Scheitern bereitstellen.

// Also erstellt Promise.reject(error) ein abgelehntes Promise mit dem angegebenen error als Grund für die Ablehnung.
// Der error ist hier ein Objekt, das einen Fehler repräsentiert, der während der Ausführung der Funktion getUser aufgetreten ist.

// return Promise.reject(error);:

// Zusammengefasst sagt diese Zeile: "Beende die Ausführung dieser Funktion und gib ein abgelehntes Promise
// mit dem angegebenen error als Grund für die Ablehnung zurück."
// Es ist eine Möglichkeit, den Fehler in der Kette der asynchronen Operationen weiterzugeben.
