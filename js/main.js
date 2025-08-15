document.addEventListener('DOMContentLoaded', () => {

    const inputCidade = document.getElementById('input-cidade');
    const botaoBuscar = document.getElementById('botao-buscar');
    const botaoLocalizacao = document.getElementById('botao-localizacao');
    const cardClima = document.getElementById('card-clima');

    // Função para buscar pelo NOME da cidade
    async function buscarERenderizarClima(cidade) {
        const containerInfoClima = document.getElementById('info-clima');
        const containerPrevisao = document.getElementById('container-previsao');

        cardClima.classList.remove('carregado');
        containerInfoClima.innerHTML = '<p>Buscando local...</p>';
        containerPrevisao.innerHTML = '';
        
        try {
            const infoGeo = await buscarInfoGeografica(cidade);
            const { lat, lon, state } = infoGeo;

            const [dadosClimaAtual, dadosPrevisao] = await Promise.all([
                buscarClimaPorCoordenadas(lat, lon),
                buscarPrevisaoPorCoordenadas(lat, lon)
            ]);
            
            localStorage.setItem('ultima_cidade', `${infoGeo.name}, ${infoGeo.state || infoGeo.country}`);
            
            renderizarClimaAtual('info-clima', dadosClimaAtual, dadosPrevisao, state);
            renderizarPrevisao('container-previsao', dadosPrevisao);

            setTimeout(() => cardClima.classList.add('carregado'), 100);

        } catch (erro) {
            renderizarErro('info-clima', erro.message);
            containerPrevisao.innerHTML = ""; 
            setTimeout(() => cardClima.classList.add('carregado'), 100);
        }
    }

    // Função para buscar por COORDENADAS (lat/lon)
    async function buscarERenderizarPorCoordenadas(lat, lon) {
        const containerInfoClima = document.getElementById('info-clima');
        const containerPrevisao = document.getElementById('container-previsao');

        cardClima.classList.remove('carregado');
        containerInfoClima.innerHTML = '<p>Identificando sua localização...</p>';
        containerPrevisao.innerHTML = '';
        
        try {
            //  local e o estado
            const infoGeo = await buscarInfoGeograficaReversa(lat, lon);
            const { state } = infoGeo;

            //  clima e a previsão
            const [dadosClimaAtual, dadosPrevisao] = await Promise.all([
                buscarClimaPorCoordenadas(lat, lon),
                buscarPrevisaoPorCoordenadas(lat, lon)
            ]);

            localStorage.setItem('ultima_cidade', `${infoGeo.name}, ${infoGeo.state || infoGeo.country}`);

            renderizarClimaAtual('info-clima', dadosClimaAtual, dadosPrevisao, state);
            renderizarPrevisao('container-previsao', dadosPrevisao);
            
            setTimeout(() => cardClima.classList.add('carregado'), 100);

        } catch (erro) {
            renderizarErro('info-clima', 'Não foi possível obter o clima da sua localização.');
            containerPrevisao.innerHTML = ""; 
            setTimeout(() => cardClima.classList.add('carregado'), 100);
        }
    }

    botaoBuscar.addEventListener('click', () => {
        const cidade = inputCidade.value.trim();
        if (cidade) { 
            buscarERenderizarClima(cidade); 
        }
    });

    inputCidade.addEventListener('keyup', (evento) => {
        if (evento.key === 'Enter') { 
            botaoBuscar.click(); 
        }
    });

    botaoLocalizacao.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    const lat = posicao.coords.latitude;
                    const lon = posicao.coords.longitude;
                    buscarERenderizarPorCoordenadas(lat, lon);
                },
                (erro) => {
                    alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
                    console.error(erro);
                }
            );
        } else {
            alert('Seu navegador não suporta geolocalização.');
        }
    });

    // Chamada Inicial
    const ultimaCidadeSalva = localStorage.getItem('ultima_cidade');
    if (ultimaCidadeSalva) {
        buscarERenderizarClima(ultimaCidadeSalva);
    } else {
        buscarERenderizarClima("São Luís, MA, BR");
    }
});