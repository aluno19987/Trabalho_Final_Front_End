function getFilmes() {
    var url = "/api/Filmes";

    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter filmes"));
            }
        });
}

function getFilme(idFilme) {
    var url = "/api/Filmes/" + idFilme;

    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter filme"));
            }
        });
}


function getFilmeCategorias(idFilme) {
    var url = "/api/Filmes/";
    url+=idFilme;
    url += "/categorias";
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter categorias do filme"));
            }
        });
}

function getFilmePersonagens(idFilme) {
    var url = "/api/Filmes/";
    url += idFilme;
    url += "/Personagens";
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter personagens do filme"));
            }
        });
}