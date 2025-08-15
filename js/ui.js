function renderizarClimaAtual(idContainer, dadosClima, dadosPrevisao, estado) {
    const container = document.getElementById(idContainer);

    const nomeCidade = dadosPrevisao.city.name;
    // Se o estado existir, mostra "Cidade, Estado". Se não, mostra "Cidade, País"
    const localizacaoFormatada = estado ? `${nomeCidade}, ${estado}` : `${nomeCidade}, ${dadosPrevisao.city.country}`;
    const iconeUrl = `https://openweathermap.org/img/wn/${dadosClima.weather[0].icon}@2x.png`;

    if (!dadosClima || !nomeCidade) {
        renderizarErro(idContainer, 'Não foi possível obter os dados da cidade.');
        return;
    }

    container.innerHTML = `
        <img class="clima-atual-icone" src="${iconeUrl}" alt="Ícone do tempo">
        <div class="clima-atual-texto">
            <h2>${localizacaoFormatada}</h2> 
            <p class="temperatura">${Math.round(dadosClima.main.temp)}°C</p>
            <p class="detalhes">
                ${dadosClima.weather[0].description} | Vento: ${dadosClima.wind.speed} m/s
            </p>
        </div>
    `;
}

function renderizarPrevisao(idContainer, dadosPrevisao) {
    const container = document.getElementById(idContainer);
    container.innerHTML = ""; 

    const previsoesDiarias = dadosPrevisao.list.filter(previsao => {
        return previsao.dt_txt.includes("12:00:00");
    });

    previsoesDiarias.forEach(dia => {
        const data = new Date(dia.dt * 1000);
        const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
        const iconeUrl = `https://openweathermap.org/img/wn/${dia.weather[0].icon}.png`;

        container.innerHTML += `
            <div class="dia-previsao">
                <p><strong>${diaSemana}</strong></p>
                <img src="${iconeUrl}" alt="${dia.weather[0].description}">
                <p>${Math.round(dia.main.temp)}°C</p>
            </div>
        `;
    });
}

function renderizarErro(idContainer, mensagem) {
    const container = document.getElementById(idContainer);
    container.innerHTML = `<p style="color:red; text-align: center;">${mensagem}</p>`;
}