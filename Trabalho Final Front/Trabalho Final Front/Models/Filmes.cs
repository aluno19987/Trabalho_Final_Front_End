﻿using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Trabalho_Final_Front.Models
{
    public class Filmes
    {

        public Filmes()
        {
            ListaReviews = new HashSet<Reviews>();

            ListaCategorias = new HashSet<Categorias>();

            ListaImagens = new HashSet<Imagens>();

            ListaPersonagens = new HashSet<Personagens>();
        }

        [Key]
        public int IdFilme { get; set; }

        public string Nome { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DataLancamento { get; set; }

        public string Realizador { get; set; }

        public string Companhia { get; set; }

        public int Duracao { get; set; }

        public string Trailer { get; set; }

        public string Cartaz { get; set; }

        public virtual ICollection<Reviews> ListaReviews { get; set; }

        public virtual ICollection<Categorias> ListaCategorias { get; set; }

        public virtual ICollection<Imagens> ListaImagens { get; set; }

        public virtual ICollection<Personagens> ListaPersonagens { get; set; }

       
    }
}