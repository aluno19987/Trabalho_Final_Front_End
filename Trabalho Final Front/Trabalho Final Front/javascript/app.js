//quando o html carregar ira a topbar e o ecra dos filmes
document.addEventListener('DOMContentLoaded', function main() {
    topbar();
    ecraFilmes();
});

//coloca no ecrã a topbar com o nome e 2 links
async function topbar() {
    //lista da topbar que ira ter os links e nome
    var FilmeContainer = document.createElement('ul');
    FilmeContainer.classList.add("nav");
    FilmeContainer.classList.add("navbar-nav");

    //link que chama a função voltaInicio que voltara ao ecrã dos filmes
    var Filme = document.createElement('li');
    Filme.addEventListener("click", voltaInicio);
    Filme.classList.add("nav-link");
    Filme.textContent = "Films";
    FilmeContainer.appendChild(Filme);

    //link que mostra a dropdow com a lista de categorias
    var CategoriasContainer = document.createElement('li');
    CategoriasContainer.classList.add("nav-item");
    CategoriasContainer.classList.add("dropdown");
    var Categorias = document.createElement('a');
    Categorias.classList.add("nav-link");
    Categorias.classList.add("dropdown-toggle");
    Categorias.setAttribute("href", "#");
    Categorias.setAttribute("data-toggle", "dropdown");
    Categorias.setAttribute("data-target", "dropdown_target");
    Categorias.textContent = "Categories";

    //adiciona ao link das categorias uma seta para muotrar que é uma dropbox
    var spanCategorias = document.createElement('span');
    spanCategorias.classList.add("caret");
    Categorias.appendChild(spanCategorias);

    //div que tera a lista de categorias e links para cada uma das categorias
    var lista = document.createElement('div');
    lista.classList.add("dropdown-menu");
    lista.setAttribute("aria-labelledby", "dropdown_target")

    //obtem os dados das categorias em json
    var categorias = await getCategorias();

    //coloca cada uma das categorias na lista de categorias com os respetivos links
    for (let i = 0; i < categorias.length; i++) {
        var categoriaContainer = document.createElement('li');
        var categoria = document.createElement('a');
        categoria.setAttribute("id", categorias[i].IdCategoria)
        categoria.classList.add("dropdown-item");
        categoria.textContent = categorias[i].Nome;
        categoria.addEventListener("click", function () {
            ecraCategoriasFilmes(this.id);
        });
        categoriaContainer.appendChild(categoria);
        lista.appendChild(categoriaContainer);
    }

    //junta os dados e coloca-os no ecrã
    CategoriasContainer.appendChild(lista);
    CategoriasContainer.appendChild(Categorias);
    FilmeContainer.appendChild(CategoriasContainer);
    document.querySelector("#collapse_target").appendChild(FilmeContainer);
}

//obtem os dados dos filme em json
function ecraFilmes() {
    return getFilmes()
        .then(function (filmes) {
            mostraFilmes(filmes);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//coloca no ecra a lista de filmes
function mostraFilmes(filmes) {
    //por cada filme
    for (var i = 0; i < filmes.length; i++) {
        //cria um div para armazenar os dados de cada filme
        var Container = document.createElement('div');
        Container.classList.add("col-sm-12");
        Container.classList.add("col-md-6");
        Container.classList.add("col-lg-4");
        Container.setAttribute("style", "width: 35rem;");
        var filme = filmes[i];

        //cria um div que ira conter o trailer e o nome do filme
        var filmeContainer = document.createElement("div");
        filmeContainer.setAttribute("class", "card");
        filmeContainer.setAttribute("style", "width: 20.15rem; height: 500px; margin-top:5px ");
        filmeContainer.setAttribute("id", filme.IdFilme);

        //criação de um img e sua colocação no seu respetivo sitio
        image = "../ImagensCartaz/" + filme.Cartaz;
        var imageContainer = document.createElement('img');
        imageContainer.classList.add("card-img-top");
        imageContainer.setAttribute("style", "width:20rem; height: 450px");
        imageContainer.setAttribute("src", image);
        filmeContainer.appendChild(imageContainer);

        //criação do h2 do nome e sua colocação no seu respetivo sitio
        var nomeContainer = document.createElement('h2');
        nomeContainer.textContent = filme.Nome;
        nomeContainer.setAttribute("class", "card-title");
        filmeContainer.appendChild(nomeContainer);
        filmeContainer.addEventListener("click", function () { escolheFilme(this.id); });
        
        //junta os dados e coloca-os no ecrã
        Container.appendChild(filmeContainer);
        document.querySelector("#filmes").appendChild(Container);
    }
}

//obtem os dados das categorias de um filme em json
function ecraCategoriasFilmes(idFilme) {
    return getCategoriasFilme(idFilme)
        .then(function (filmes) {
            mostraCategoriasFilmes(filmes);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//mostra no ecrã os filme de uma categoria
function mostraCategoriasFilmes(filmes) {
    document.querySelector("#filmes").textContent = "";
    document.querySelector("#imagens").textContent = "";
    document.querySelector("#trailer").textContent = "";
    document.querySelector("#listaPersonagens").textContent = "";
    document.querySelector("#reviews").textContent = "";
    document.querySelector("#filmes").setAttribute("style", "display:flex");
    document.querySelector("#filme").setAttribute("style", "display:none");
    document.querySelector("#multimedia").setAttribute("style", "display:none");
    document.querySelector("#personagens").setAttribute("style", "display:none");
    document.querySelector("#reviews").setAttribute("style", "display:none");
    mostraFilmes(filmes);
}


//obtem os dados de um filme em json
function ecraFilme(id) {
    return getFilme(id)
        .then(function (filme) {
            mostraFilme(filme);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//mostra no ecrã os detalhes de um filme
async function mostraFilme(filme) {

    //criação de um contentor para colocar os dados da imagem e informação como data de lançamento, realizador, etc
    var filmeContainer = document.createElement("div");
    filmeContainer.setAttribute("class", "row");
    filmeContainer.setAttribute("id", "filme"+filme.IdFilme);

    //criação da um img e sua colocação no seu respetivo sitio
    var imageContainer = document.createElement('div');
    imageContainer.classList.add("col-sm-5");
    imageContainer.classList.add("col-md-5");
    imageContainer.classList.add("col-lg-4");
    src = "../ImagensCartaz/" + filme.Cartaz;
    var imagem = document.createElement('img');
    imagem.classList.add("img-thumbnail");
    imagem.setAttribute("src", src);
    imagem.setAttribute("style", "border:0px; margin-left:16px");
    imageContainer.appendChild(imagem);
    filmeContainer.appendChild(imageContainer);

    //criação do div dos detalhes
    var infoContainer = document.createElement("div");
    infoContainer.classList.add("col-sm-7");
    infoContainer.classList.add("col-md-7");
    infoContainer.classList.add("col-lg-8");
    infoContainer.setAttribute("id", "info");

    //criação de um h3 com o nome do filme
    var tituloContainer = document.createElement("h3");
    tituloContainer.textContent=filme.Nome;
    infoContainer.appendChild(tituloContainer);
    infoContainer.appendChild(document.createElement("br"));

    //criação de um p com a data de lançamento
    var dataContainer = document.createElement("p");
    dataContainer.textContent = "Launch date: "+ filme.DataLancamento.substring(0,10);
    infoContainer.appendChild(dataContainer);

    //criação de um p com o nome de o realizador
    var realizadorContainer = document.createElement("p");
    realizadorContainer.textContent = "Company: " + filme.Realizador;
    infoContainer.appendChild(realizadorContainer);

    //criação de um p com o nome da companhia 
    var companhiaContainer = document.createElement("p");
    companhiaContainer.textContent = "Director: " + filme.Companhia;
    infoContainer.appendChild(companhiaContainer);

    //criação de um p com duração do filme
    var duracaoContainer = document.createElement("p");
    var duracao = filme.Duracao;
    duracaoContainer.textContent = "Duration: " + Math.floor(duracao/60) + "h" + duracao % 60 + "min";
    infoContainer.appendChild(duracaoContainer);

    //obtem os dados das categorias do filme
    var categorias = await getFilmeCategorias(filme.IdFilme);
    //criação de um p com as deferentes categorias
    var categoriasContainer = document.createElement("p");
    categoriasContainer.textContent = "Categories: ";
    for (var i = 0; i < categorias.length; i++) {
        categoriasContainer.textContent += categorias[i].Nome;
        if (i !== categorias.length - 1) {
            categoriasContainer.textContent += ", ";
        } 
    }
    infoContainer.appendChild(categoriasContainer);
    filmeContainer.appendChild(infoContainer);

    //criação de um div com a thumbnail do trailer do filme
    var trailerContainer = document.createElement('div');
    trailerContainer.setAttribute("style", " height:250px; width:370px;");
    var trailer = document.createElement("img");
    var src = "//img.youtube.com/vi/" + filme.Trailer + "/hqdefault.jpg";
    trailer.setAttribute("src", src);
    trailer.setAttribute("style", "height: 250px; width: 370px;");
    trailer.setAttribute("id", filme.Trailer);

    //adiçao ao div do trailer um eventlistener que quando clicado ativara o modal e mostrara o trailer no modal
    trailer.addEventListener("click", function () {
        modal(this.id, "video");
    }, false);
    trailer.setAttribute("data-toggle", "modal");
    trailer.setAttribute("data-target", ".bd-example-modal-lg");
    trailerContainer.appendChild(trailer);

    //junta os dados e coloca-os no ecrã
    document.querySelector("#trailer").appendChild(trailerContainer);
    document.querySelector("#filme").appendChild(filmeContainer);

    //chama a função que mostra as personagem de um filme e a função que mostra as reviews de um filme
    ecraFilmePersonagens(filme.IdFilme);
    ecraFilmeReviews(filme.IdFilme);
}


//obtem os dados das categorias de um filme em json
function ecraFilmeImagens(id) {
    return getFilmeImagens(id)
        .then(function (imagens) {
            mostraFilmeImagens(imagens);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//mostra as imagem de um filme
function mostraFilmeImagens(imagens) {
    //por cada imagem
    for (var i = 0; i < imagens.length; i++) {
        //criação de img com a respetiva imagem
        var src = "/Imagens/"+imagens[i].Nome;
        var imagemContainer = document.createElement('img');
        imagemContainer.setAttribute("src", src);
        imagemContainer.classList.add("imagens");
        imagemContainer.classList.add("col-lg-7");
        imagemContainer.classList.add("col-md-7");
        imagemContainer.classList.add("col-sm-7");

        //adição de um event listener que ao clicar na imagem ativara o modal e mostrara a imagem
        imagemContainer.addEventListener("click", function () {
            modal(this.src, "imagem");
        }, false);
        imagemContainer.setAttribute("data-toggle", "modal");
        imagemContainer.setAttribute("data-target", ".bd-example-modal-lg");

        //junta os dados e coloca-os no ecrã
        document.querySelector("#imagens").appendChild(imagemContainer);
    }
}


//obtem os dados de um personagem em json
function ecraFilmePersonagens(id) {
    return getFilmePersonagens(id)
        .then(function (personagens) {
            mostraFilmePersonagens(personagens);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//mostra as personagem de um filme
function mostraFilmePersonagens(personagens) {
    //por cada persenagem
    for (var i = 0; i < personagens.length; i++) {
        var personagem = personagens[i];

        //criação de um div para colocar as informações da personagem
        var Container = document.createElement('div');
        Container.classList.add("col-sm-6");
        Container.classList.add("col-md-4");
        Container.classList.add("col-lg-3");
        Container.setAttribute("style", "width: 35rem;");
        
        //criação de um div para a imagem e nome do personagem
        var personagemContainer = document.createElement("div");
        personagemContainer.setAttribute("class", "card");
        personagemContainer.setAttribute("style", "width: 15.2rem; height: 280px; margin-top:5px ");
        personagemContainer.setAttribute("id", personagem.IdPersonagem);

        //criação de um img e colocação da imagem da personagem
        image = "../ImagensPersonagens/" + personagem.Imagem;
        var imageContainer = document.createElement('img');
        imageContainer.classList.add("card-img-top");
        imageContainer.setAttribute("style", "width:15rem; height: 240px; object-fit:cover;");
        imageContainer.setAttribute("id", personagem.IdPersonagem);
        imageContainer.setAttribute("src", image);
        imageContainer.setAttribute("data-toggle", "modal");
        imageContainer.setAttribute("data-target", ".modalPersonagensAtores");

        //adição de um event listener que ativara o modal e ira mostrar a personagem e ator que interpretou essa personagem
        imageContainer.addEventListener("click", function () {
            ecraPersonagemAtor(this.id);
        }, false);
        personagemContainer.appendChild(imageContainer);

        //criação de umh3 com o nome da personagem
        var nomeContainer = document.createElement('h3');
        nomeContainer.textContent = personagem.Nome;
        nomeContainer.setAttribute("class", "card-title");
        personagemContainer.appendChild(nomeContainer);

        //junta os dados e coloca-os no ecrã
        Container.appendChild(personagemContainer);
        document.querySelector("#listaPersonagens").appendChild(Container);
    }
}


//obtem os dados das reviews de um filme em json
function ecraFilmeReviews(id) {
    return getFilmeReviews(id)
        .then(function (reviews) {
            mostraFilmeReviews(reviews);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//mostra as reviews de um filme
function mostraFilmeReviews(reviews) {
    //criação de um h2 para titulo reviews
    var TituloDiv = document.createElement('h2');
    TituloDiv.textContent = "Reviews";
    document.querySelector("#reviews").appendChild(TituloDiv);

    //por cada review 
    for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];

        //criação de um div que ir ter as informação das reviews
        var Container = document.createElement('div');
        Container.classList.add("well");
        Container.classList.add("rounded");
        Container.setAttribute("style", "background-color:darkgrey; padding:5px; margin-bottom:15px; width:90%; position:relative; left:5%;")

        //criação de um h2 para o titulo da review
        var tituloContainer = document.createElement('h4');
        tituloContainer.textContent = review.TituloReview;
        Container.appendChild(tituloContainer);

        //criação de um p para a classificação da pessoa que criou a review
        var pontuaçãoContainer = document.createElement('p');
        pontuaçãoContainer.textContent = "Classification: "+ review.NStars + "/10";
        Container.appendChild(pontuaçãoContainer);

        //criação de um p para o corpo da review
        var reviewContainer = document.createElement('p');
        reviewContainer.textContent = review.Review;
        Container.appendChild(reviewContainer);

        //junta os dados e coloca-os no ecrã
        document.querySelector("#reviews").appendChild(Container);

    }
}


//obtem os dados de um personagem em json
function ecraPersonagemAtor(IdPersonagem) {
    return getPersonagem(IdPersonagem)
        .then(function (personagem) {
            modalPersonagemAtor(personagem);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//coloca no modal a personagem e ator que interpreta a personagem
async function modalPersonagemAtor(personagem) {
    //obtem os dados do ator
    var ator = await getAtor(personagem.AtorFK);

    //limpa o modal
    document.querySelector("#modalAtor").textContent = "";
    document.querySelector("#modalPersonagem").textContent = "";

    //criação de um div para colocação da informação do ator
    var atorContainer = document.createElement('div');

    //criação de uma img para a imagem do ator
    var imagemAtor = "../ImagensAtores/" + ator.Imagem;
    var atorImagemContainer = document.createElement('img');
    atorImagemContainer.setAttribute("src", imagemAtor);
    atorImagemContainer.setAttribute("style", "height: 400px; width: 300px; object - fit: cover;");
    atorImagemContainer.classList.add("img-fluid");
    atorContainer.appendChild(atorImagemContainer);

    //criação de um h3 para o nome do ator
    var atorNomeContainer = document.createElement('h3');
    atorNomeContainer.textContent = ator.Nome;
    atorContainer.appendChild(atorNomeContainer);

    //criação de um div para colocação da informação do personagem
    var personagemContainer = document.createElement('div');

    //criação de uma img para a imagem do personagem
    var imagemPersonagem = "../ImagensPersonagens/" + personagem.Imagem;
    var personagemImagemContainer = document.createElement('img');
    personagemImagemContainer.setAttribute("src", imagemPersonagem);
    personagemImagemContainer.setAttribute("style", "height: 400px; width: 300px; object-fit: cover;");

    //criação de um h3 para o nome do personaagem
    personagemContainer.classList.add("img-fluid");
    personagemContainer.appendChild(personagemImagemContainer);
    var personagemNomeContainer = document.createElement('h3');
    personagemNomeContainer.textContent = personagem.Nome;
    personagemContainer.appendChild(personagemNomeContainer);

    //junta os dados e coloca-os no ecrã
    document.querySelector("#modalAtor").appendChild(atorContainer);
    document.querySelector("#modalPersonagem").appendChild(personagemContainer);
}

//coloca no modal o trailer ou imagem do filme
function modal(src, tipo) {
    //se for um trailer
    if (tipo == "video") {
        var novaSrc = "https://www.youtube.com/embed/" + src;
        //limpa o modal e coloca o src do video
        document.querySelector("#modalTrailer").setAttribute("src", novaSrc)
        document.querySelector("#modalTrailer").setAttribute("style", "display:block; height: 800px; width: 1000px;")
        document.querySelector("#modalImage").setAttribute("src", "")
        document.querySelector("#modalImage").setAttribute("style", "display:none")
    }
    //se for uma imagem
    else {
        //limpa o modal e coloca o src da imagem
        document.querySelector("#modalTrailer").setAttribute("src", "")
        document.querySelector("#modalTrailer").setAttribute("style", "display:none")
        document.querySelector("#modalImage").setAttribute("src", src)
        document.querySelector("#modalImage").setAttribute("style", "display:block;  height: 800px; width: 1000px; object-fit:cover;")
    }
}

//função que limpa todos os ecras e chama a função que mostra os detalhes de um filme
function escolheFilme(id) {
    //limpa os ecrãs
    document.querySelector("#filme").textContent = "";
    document.querySelector("#imagens").textContent = "";
    document.querySelector("#trailer").textContent = "";
    document.querySelector("#listaPersonagens").textContent = "";
    document.querySelector("#reviews").textContent = "";
    //troca os ecrãs
    document.querySelector("#filmes").setAttribute("style", "display:none");
    document.querySelector("#filme").setAttribute("style", "display:block");
    document.querySelector("#multimedia").setAttribute("style", "display:flex");
    document.querySelector("#personagens").setAttribute("style", "display:flex");
    document.querySelector("#reviews").setAttribute("style", "display:block");
    //chamada da funçao que mostra os detalhes do filme
    ecraFilme(id);
    ecraFilmeImagens(id);
}

//funçao que volta ao ecrã inicial dos filmes
function voltaInicio() {
    //limpa os ecrãs
    document.querySelector("#filmes").textContent = "";
    document.querySelector("#imagens").textContent = "";
    document.querySelector("#trailer").textContent = "";
    document.querySelector("#listaPersonagens").textContent = "";
    document.querySelector("#reviews").textContent = "";
    //troca os ecrãs
    document.querySelector("#filmes").setAttribute("style", "display:flex");
    document.querySelector("#filme").setAttribute("style", "display:none");
    document.querySelector("#multimedia").setAttribute("style", "display:none");
    document.querySelector("#personagens").setAttribute("style", "display:none");
    document.querySelector("#reviews").setAttribute("style", "display:none");
    //chamada da função que mostra a lista de filmes
    ecraFilmes();
}