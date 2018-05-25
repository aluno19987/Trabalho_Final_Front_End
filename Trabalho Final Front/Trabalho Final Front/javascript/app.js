document.addEventListener('DOMContentLoaded', function main() {
    ecraFilme(1);
});

function mostraFilmes(filmes) {
    for (var i = 0; i < filmes.length; i++) {
        var Container = document.createElement('div');
        Container.classList.add("col-sm-6");
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

        Container.appendChild(filmeContainer);
        document.querySelector("#filmes").appendChild(Container);
    }
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


async function mostraFilme(filme) {

    var filmeContainer = document.createElement("div");
    filmeContainer.setAttribute("class", "row");
    filmeContainer.setAttribute("id", "filme"+filme.IdFilme);


    var imageContainer = document.createElement('div');
    imageContainer.classList.add("col-sm-6");
    imageContainer.classList.add("col-md-6");
    imageContainer.classList.add("col-lg-3");
    src = "../ImagensCartaz/" + filme.Cartaz;
    var imagem = document.createElement('img');
    imagem.classList.add("img-thumbnail");
    imagem.setAttribute("src", src);
    imagem.setAttribute("style", "border:0px");

    imageContainer.appendChild(imagem);
    filmeContainer.appendChild(imageContainer);
    
    var infoContainer = document.createElement("div");
    infoContainer.classList.add("col-sm-6");
    infoContainer.classList.add("col-md-6");
    infoContainer.classList.add("col-lg-4");
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
        if (i != categorias.length - 1) {
            categoriasContainer.textContent += ", "
        } 
    }
    infoContainer.appendChild(categoriasContainer);
    filmeContainer.appendChild(infoContainer);

    var trailerContainer = document.createElement('div');
    trailerContainer.classList.add("embed-responsive");
    trailerContainer.classList.add("embed-responsive-16by9");
    trailerContainer.classList.add("col-sm-12");
    trailerContainer.classList.add("col-md-12");
    trailerContainer.classList.add("col-lg-5");
    var trailer = document.createElement("iframe");
    var src = "https://www.youtube.com/embed/" + filme.Trailer +"?rel=0";
    trailer.setAttribute("src", src);
    trailer.setAttribute("style", "border:0px;");
    trailer.setAttribute("allowfullscreen", "allowfullscreen");
    trailer.classList.add("embed-responsive-item");
    trailerContainer.appendChild(trailer);
    filmeContainer.appendChild(trailerContainer);
    


    document.querySelector("#filme").appendChild(filmeContainer);
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
