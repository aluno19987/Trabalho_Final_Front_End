//obtem a lista de filme
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

//obtem um filme a partir do id do filme
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

//obtem as categorias de um filme a partir do id do filme
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

//obtem as personagens de um filme a partir do id do filme
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

//obtem as imagens de um filme a partir do id do filme
function getFilmeImagens(idFilme) {
    var url = "/api/Filmes/";
    url += idFilme;
    url += "/Imagens";
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter Imagens do filme"));
            }
        });
}

//function getFilmePersonagens(idFilme) {
//    var url = "/api/Filmes/";
//    url += idFilme;
//    url += "/Personagens";
//    return fetch(url, { headers: { Accept: 'application/json' } })
//        .then(function (resposta) {
//            if (resposta.status === 200) {
//                return resposta.json();
//            } else {
//                return Promise.reject(new Error("Erro ao obter Personagens do filme"));
//            }
//        });
//}

//obtem as reviews de um filme a partir do id do filme
function getFilmeReviews(idFilme) {
    var url = "/api/Filmes/";
    url += idFilme;
    url += "/Reviews";
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter Reviews do filme"));
            }
        });
}

//obtem a lista de categorias
function getCategorias() {
    var url = "/api/Categorias";
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter Categorias"));
            }
        });
}

//obtem uma personagem a partir de um id da personagem
function getPersonagem(idPersonagem) {
    var url = "/api/Personagens/" + idPersonagem;
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter personagem"));
            }
        });
}

//obtem um ator a partir do id do ator
function getAtor(idAtor) {
    var url = "/api/Atores/" + idAtor;
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter ator"));
            }
        });
}

//obtem a lista de filme que pertence a uma categorias
function getCategoriasFilme(idCategoria) {
    var url = "/api/Categorias/";
    url += idCategoria;
    url+= "/Filmes"
    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter filmes da Categoria"));
            }
        });
}