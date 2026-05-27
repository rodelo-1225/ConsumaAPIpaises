async function obtenerPais() {
  
    const paisInput = document.getElementById("pais").value.trim();
    
    if (paisInput === "") {
        document.getElementById("resultado").innerHTML = "<p>Por favor ingrese un país</p>";
        return;
    }

    const url = `https://restcountries.com/v3.1/translation/${paisInput}`;

    try {
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            document.getElementById("resultado").innerHTML = "<p>País no encontrado. Verifique la ortografía.</p>";
            return;
        }
        
        const datos = await respuesta.json();
        let infoPais = datos.find(pais => 
            pais.translations && 
            pais.translations.spa && 
            pais.translations.spa.common.toLowerCase() === paisInput.toLowerCase()
        );

        
        if (!infoPais) {
            infoPais = datos[0];
        }
        // --------------------------------

        const nombre = infoPais.name.common;
        const bandera = infoPais.flags.svg;
        const capital = infoPais.capital ? infoPais.capital[0] : "No tiene capital";
        const poblacion = infoPais.population.toLocaleString('es-CO'); 
        const idiomas = infoPais.languages ? Object.values(infoPais.languages).join(", ") : "No disponible";
        
        document.getElementById("resultado").innerHTML = `
            <h2>${nombre}</h2>
            <img src="${bandera}" alt="Bandera de ${nombre}" class="bandera">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Población:</strong> ${poblacion} habitantes</p>
            <p><strong>Idioma(s):</strong> ${idiomas}</p>
        `;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("resultado").innerHTML = "<p>Ocurrió un error al buscar el país.</p>";
    }
}