// Converte um texto (ex: "São Luís, MA") em dados geográficos (lat, lon, estado)
async function buscarInfoGeografica(cidadeQuery) {
    try {
        const chaveAPI = "7023fe0be8d92a64dceae34b3cd4dd5d";
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cidadeQuery)}&limit=1&appid=${chaveAPI}`;
        const resposta = await fetch(url);
        if (!resposta.ok) { throw new Error("Erro ao buscar dados geográficos."); }
        const dados = await resposta.json();
        if (dados.length === 0) { throw new Error("Não foi possível encontrar um local com este nome."); }
        return dados[0];
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}

// Converte coordenadas (lat, lon) em dados geográficos (cidade, estado)
async function buscarInfoGeograficaReversa(lat, lon) {
    try {
        const chaveAPI = "7023fe0be8d92a64dceae34b3cd4dd5d";
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${chaveAPI}`;
        const resposta = await fetch(url);
        if (!resposta.ok) { throw new Error("Erro na busca de geolocalização reversa."); }
        const dados = await resposta.json();
        if (dados.length === 0) { throw new Error("Não foi possível identificar o local para estas coordenadas."); }
        return dados[0];
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}

// Busca o clima ATUAL usando coordenadas
async function buscarClimaPorCoordenadas(lat, lon) {
    try {
        const chaveAPI = "7023fe0be8d92a64dceae34b3cd4dd5d";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${chaveAPI}`;
        const resposta = await fetch(url);
        if (!resposta.ok) { throw new Error("Erro ao buscar clima atual por coordenadas."); }
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}

// Busca a PREVISÃO usando coordenadas
async function buscarPrevisaoPorCoordenadas(lat, lon) {
    try {
        const chaveAPI = "7023fe0be8d92a64dceae34b3cd4dd5d";
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${chaveAPI}`;
        const resposta = await fetch(url);
        if (!resposta.ok) { throw new Error("Erro ao buscar previsão por coordenadas."); }
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}