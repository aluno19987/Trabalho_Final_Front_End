document.addEventListener('DOMContentLoaded', function main() {
    topbar();
    ecraFilmes();
});

async function topbar() {
    var FilmeContainer = document.createElement('ul');
    FilmeContainer.classList.add("nav");
    FilmeContainer.classList.add("navbar-nav");

    var Filme = document.createElement('li');
    Filme.addEventListener("click", voltaInicio);
    Filme.classList.add("nav-link");
    Filme.textContent = "Filmes";

    FilmeContainer.appendChild(Filme);

    var CategoriasContainer = document.createElement('li');
    CategoriasContainer.classList.add("nav-item");
    CategoriasContainer.classList.add("dropdown");

    var Categorias = document.createElement('a');
    Categorias.classList.add("nav-link");
    Categorias.classList.add("dropdown-toggle");
    Categorias.setAttribute("href", "#");
    Categorias.setAttribute("data-toggle", "dropdown");
    Categorias.setAttribute("data-target", "dropdown_target");
    Categorias.textContent = "Categorias";

    var spanCategorias = document.createElement('span');
    spanCategorias.classList.add("caret");

    Categorias.appendChild(spanCategorias);

    var lista = document.createElement('div');
    lista.classList.add("dropdown-menu");
    lista.setAttribute("aria-labelledby", "dropdown_target")
    lista.setAttribute("aria-labelledby", "dropdownMenuButton")
    lista.setAttribute("aria-labelledby", "dropdownMenuButton")

    var categorias = await getCategorias();

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

    CategoriasContainer.appendChild(lista);
    CategoriasContainer.appendChild(Categorias);
    
    FilmeContainer.appendChild(CategoriasContainer);
    document.querySelector("#collapse_target").appendChild(FilmeContainer);
}


function ecraFilmes() {
    return getFilmes()
        .then(function (filmes) {
            mostraFilmes(filmes);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}


function mostraFilmes(filmes) {
    for (var i = 0; i < filmes.length; i++) {
        var Container = document.createElement('div');
        Container.classList.add("col-sm-12");
        Container.classList.add("col-md-6");
        Container.classList.add("col-lg-4");
        Container.setAttribute("style", "width: 35rem;");
        var filme = filmes[i];
        var filmeContainer = document.createElement("div");
        filmeContainer.setAttribute("class", "card");
        filmeContainer.setAttribute("style", "width: 20.15rem; height: 500px; margin-top:5px ");
        filmeContainer.setAttribute("id", filme.IdFilme);

        image = "../ImagensCartaz/" + filme.Cartaz;
        var imageContainer = document.createElement('img');
        imageContainer.classList.add("card-img-top");
        imageContainer.setAttribute("style", "width:20rem; height: 450px");
        imageContainer.setAttribute("src", image);
        filmeContainer.appendChild(imageContainer);

        var nomeContainer = document.createElement('h2');
        nomeContainer.textContent = filme.Nome;
        nomeContainer.setAttribute("class", "card-title");
        filmeContainer.appendChild(nomeContainer);
        filmeContainer.addEventListener("click", function () { escolheFilme(this.id); });

        Container.appendChild(filmeContainer);
        document.querySelector("#filmes").appendChild(Container);
    }
}

function ecraCategoriasFilmes(idFilme) {
    return getCategoriasFilme(idFilme)
        .then(function (filmes) {
            mostraCategoriasFilmes(filmes);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

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

function ecraFilme(id) {
    return getFilme(id)
        .then(function (filme) {
            mostraFilme(filme);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}


async function mostraFilme(filme) {

    var filmeContainer = document.createElement("div");
    filmeContainer.setAttribute("class", "row");
    filmeContainer.setAttribute("id", "filme"+filme.IdFilme);


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
    
    var infoContainer = document.createElement("div");
    infoContainer.classList.add("col-sm-7");
    infoContainer.classList.add("col-md-7");
    infoContainer.classList.add("col-lg-8");
    infoContainer.setAttribute("id", "info");

    var tituloContainer = document.createElement("h3");
    tituloContainer.textContent=filme.Nome;
    infoContainer.appendChild(tituloContainer);
    infoContainer.appendChild(document.createElement("br"));

    var dataContainer = document.createElement("p");
    dataContainer.textContent = "Data de lançamento: "+ filme.DataLancamento.substring(0,10);
    infoContainer.appendChild(dataContainer);

    var realizadorContainer = document.createElement("p");
    realizadorContainer.textContent = "Companhia: " + filme.Realizador;
    infoContainer.appendChild(realizadorContainer);
    var companhiaContainer = document.createElement("p");
    companhiaContainer.textContent = "Realizador: " + filme.Companhia;
    infoContainer.appendChild(companhiaContainer);
    var duracaoContainer = document.createElement("p");
    var duracao = filme.Duracao;
    duracaoContainer.textContent = "Duração: " + Math.floor(duracao/60) + "h" + duracao % 60 + "min";
    infoContainer.appendChild(duracaoContainer);
    
    var categorias = await getFilmeCategorias(filme.IdFilme);
    var categoriasContainer = document.createElement("p");
    categoriasContainer.textContent = "Categorias: ";
    for (var i = 0; i < categorias.length; i++) {
        categoriasContainer.textContent += categorias[i].Nome;
        if (i !== categorias.length - 1) {
            categoriasContainer.textContent += ", ";
        } 
    }
    infoContainer.appendChild(categoriasContainer);
    filmeContainer.appendChild(infoContainer);

    var trailerContainer = document.createElement('div');
    trailerContainer.setAttribute("style", " height:250px; width:370px;");
    var trailer = document.createElement("img");
    var src = "//img.youtube.com/vi/" + filme.Trailer + "/hqdefault.jpg";
    trailer.setAttribute("src", src);
    trailer.setAttribute("style", "height: 250px; width: 370px;");
    trailer.setAttribute("id", filme.Trailer);
    trailer.addEventListener("click", function () {
        modal(this.id, "video");
    }, false);

    trailer.setAttribute("data-toggle", "modal");
    trailer.setAttribute("data-target", ".bd-example-modal-lg");
    trailerContainer.appendChild(trailer);

    document.querySelector("#trailer").appendChild(trailerContainer);
    document.querySelector("#filme").appendChild(filmeContainer);

    ecraFilmePersonagens(filme.IdFilme);
    ecraFilmeReviews(filme.IdFilme);
}

function ecraFilmeImagens(id) {
    return getFilmeImagens(id)
        .then(function (imagens) {
            mostraFilmeImagens(imagens);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function mostraFilmeImagens(imagens) {
    for (var i = 0; i < imagens.length; i++) {
        var src = "/Imagens/"+imagens[i].Nome;
        var imagemContainer = document.createElement('img');
        imagemContainer.setAttribute("src", src);
        imagemContainer.classList.add("imagens");
        imagemContainer.classList.add("col-lg-7");
        imagemContainer.classList.add("col-md-7");
        imagemContainer.classList.add("col-sm-7");
        imagemContainer.addEventListener("click", function () {
            modal(this.src, "imagem");
        }, false);
        imagemContainer.setAttribute("data-toggle", "modal");
        imagemContainer.setAttribute("data-target", ".bd-example-modal-lg");
        document.querySelector("#imagens").appendChild(imagemContainer);
    }
}

function ecraFilmePersonagens(id) {
    return getFilmePersonagens(id)
        .then(function (personagens) {
            mostraFilmePersonagens(personagens);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function mostraFilmePersonagens(personagens) {
    for (var i = 0; i < personagens.length; i++) {
        var Container = document.createElement('div');
        Container.classList.add("col-sm-6");
        Container.classList.add("col-md-4");
        Container.classList.add("col-lg-3");
        Container.setAttribute("style", "width: 35rem;");
        
        var personagem = personagens[i];
        var personagemContainer = document.createElement("div");
        personagemContainer.setAttribute("class", "card");
        personagemContainer.setAttribute("style", "width: 15.2rem; height: 280px; margin-top:5px ");
        personagemContainer.setAttribute("id", personagem.IdPersonagem);

        image = "../ImagensPersonagens/" + personagem.Imagem;
        var imageContainer = document.createElement('img');
        imageContainer.classList.add("card-img-top");
        imageContainer.setAttribute("style", "width:15rem; height: 240px; object-fit:cover;");
        imageContainer.setAttribute("id", personagem.IdPersonagem);
        imageContainer.setAttribute("src", image);
        imageContainer.setAttribute("data-toggle", "modal");
        imageContainer.setAttribute("data-target", ".modalPersonagensAtores");
        imageContainer.addEventListener("click", function () {
            ecraPersonagemAtor(this.id);
        }, false);
        personagemContainer.appendChild(imageContainer);

        var nomeContainer = document.createElement('h3');
        nomeContainer.textContent = personagem.Nome;
        nomeContainer.setAttribute("class", "card-title");
        personagemContainer.appendChild(nomeContainer);

        Container.appendChild(personagemContainer);
        document.querySelector("#listaPersonagens").appendChild(Container);
    }
}

function ecraFilmeReviews(id) {
    return getFilmeReviews(id)
        .then(function (reviews) {
            mostraFilmeReviews(reviews);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function mostraFilmeReviews(reviews) {
    var TituloDiv = document.createElement('h2');
    TituloDiv.textContent = "Reviews";
    document.querySelector("#reviews").appendChild(TituloDiv);
    for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];

        var Container = document.createElement('div');
        Container.classList.add("well");
        Container.classList.add("rounded");
        Container.setAttribute("style", "background-color:darkgrey; padding:5px; margin-bottom:15px; width:90%; position:relative; left:5%;")

        var tituloContainer = document.createElement('h4');
        tituloContainer.textContent = review.TituloReview;
        Container.appendChild(tituloContainer);

        var pontuaçãoContainer = document.createElement('p');
        pontuaçãoContainer.textContent ="Classificação: "+ review.NStars + "/10";
        Container.appendChild(pontuaçãoContainer);

        var reviewContainer = document.createElement('p');
        reviewContainer.textContent = review.Review;
        Container.appendChild(reviewContainer);

        document.querySelector("#reviews").appendChild(Container);

    }
}

function ecraPersonagemAtor(IdPersonagem) {
    return getPersonagem(IdPersonagem)
        .then(function (personagem) {
            modalPersonagemAtor(personagem);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

async function modalPersonagemAtor(personagem) {
    var ator = await getAtor(personagem.AtorFK);
    document.querySelector("#modalAtor").textContent = "";
    document.querySelector("#modalPersonagem").textContent = "";


    var atorContainer = document.createElement('div');
    var imagemAtor = "../ImagensAtores/" + ator.Imagem;
    var atorImagemContainer = document.createElement('img');
    atorImagemContainer.setAttribute("src", imagemAtor);
    atorImagemContainer.setAttribute("style", "height: 400px; width: 300px; object - fit: cover;");

    //atorImagemContainer.classList.add("imagensModal2");
    atorImagemContainer.classList.add("img-fluid");
    atorContainer.appendChild(atorImagemContainer);
    var atorNomeContainer = document.createElement('h3');
    atorNomeContainer.textContent = ator.Nome;
    atorContainer.appendChild(atorNomeContainer);


    var personagemContainer = document.createElement('div');
    var imagemPersonagem = "../ImagensPersonagens/" + personagem.Imagem;
    var personagemImagemContainer = document.createElement('img');
    personagemImagemContainer.setAttribute("src", imagemPersonagem);
    personagemImagemContainer.setAttribute("style", "height: 400px; width: 300px; object-fit: cover;");

    //personagemContainer.classList.add("imagensModal2");
    personagemContainer.classList.add("img-fluid");
    personagemContainer.appendChild(personagemImagemContainer);
    var personagemNomeContainer = document.createElement('h3');
    personagemNomeContainer.textContent = personagem.Nome;
    personagemContainer.appendChild(personagemNomeContainer);



    document.querySelector("#modalAtor").appendChild(atorContainer);
    document.querySelector("#modalPersonagem").appendChild(personagemContainer);
}

function modal(src, tipo) {
    if (tipo == "video") {
        var novaSrc = "https://www.youtube.com/embed/" + src;
        document.querySelector("#modalTrailer").setAttribute("src", novaSrc)
        document.querySelector("#modalTrailer").setAttribute("style", "display:block; height: 800px; width: 1000px;")
        document.querySelector("#modalImage").setAttribute("src", "")
        document.querySelector("#modalImage").setAttribute("style", "display:none")
    } else {
        document.querySelector("#modalTrailer").setAttribute("src", "")
        document.querySelector("#modalTrailer").setAttribute("style", "display:none")
        document.querySelector("#modalImage").setAttribute("src", src)
        document.querySelector("#modalImage").setAttribute("style", "display:block;  height: 800px; width: 1000px; object-fit:cover;")
    }
}

function escolheFilme(id) {
    document.querySelector("#filme").textContent = "";
    document.querySelector("#imagens").textContent = "";
    document.querySelector("#trailer").textContent = "";
    document.querySelector("#listaPersonagens").textContent = "";
    document.querySelector("#reviews").textContent = "";
    document.querySelector("#filmes").setAttribute("style", "display:none");
    document.querySelector("#filme").setAttribute("style", "display:block");
    document.querySelector("#multimedia").setAttribute("style", "display:flex");
    document.querySelector("#personagens").setAttribute("style", "display:flex");
    document.querySelector("#reviews").setAttribute("style", "display:block");
    ecraFilme(id);
    ecraFilmeImagens(id);
}

function voltaInicio() {
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
    ecraFilmes();
}