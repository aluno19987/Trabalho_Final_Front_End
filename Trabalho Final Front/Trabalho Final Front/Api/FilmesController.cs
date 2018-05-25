using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Trabalho_Final_Front.Models;

namespace Trabalho_Final_Front.Api
{

    [RoutePrefix("api/filmes")]
    public class FilmesController : ApiController
    {
          
        private FilmesDb db = new FilmesDb();

        // GET: api/Filmes
        public IHttpActionResult GetFilmes()
        {
            var resultado = db.Filmes
                .Select(filmes => new
                {
                    filmes.IdFilme,
                    filmes.Nome,
                    filmes.DataLancamento,
                    filmes.Realizador,
                    filmes.Companhia,
                    filmes.Duracao,
                    filmes.Trailer,
                    filmes.Cartaz

                })
                .ToList();
            

            return Ok(resultado);
        }

        // GET: api/Filmes/5
        [ResponseType(typeof(Filmes))]
        public IHttpActionResult GetFilmes(int id)
        {
            Filmes filmes = db.Filmes.Find(id);
            if (filmes == null)
            {
                return NotFound();
            }
            var resultado = new
            {
                filmes.IdFilme,
                filmes.Nome,
                filmes.DataLancamento,
                filmes.Realizador,
                filmes.Companhia,
                filmes.Duracao,
                filmes.Trailer,
                filmes.Cartaz
            };
            return Ok(resultado);
        }

        // GET: api/Filmes/5/Categorias
        [HttpGet, Route("{id}/Categorias")]
        [ResponseType(typeof(Filmes))]
        public IHttpActionResult GetFilmeCategorias(int id)
        {
            Filmes filmes = db.Filmes.Find(id);
            if (filmes == null)
            {
                return NotFound();
            }
            var resultado =filmes.ListaCategorias
                .Select(categorias=> new
            {
                categorias.IdCategoria,
                categorias.Nome
            }).ToList(); 
            return Ok(resultado);
        }

        // GET: api/Filmes/5/Personagens
        [HttpGet, Route("{id}/Personagens")]
        [ResponseType(typeof(Filmes))]
        public IHttpActionResult GetFilmePersonagens(int id)
        {
            Filmes filmes = db.Filmes.Find(id);
            if (filmes == null)
            {
                return NotFound();
            }
            var resultado = filmes.ListaPersonagens
                .Select(personagens => new
                {
                    personagens.IdPersonagem,
                    personagens.Nome,
                    personagens.Imagem,
                    personagens.AtorFK
                }).ToList();
            return Ok(resultado);
        }


        // PUT: api/Filmes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFilmes(int id, Filmes filmes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != filmes.IdFilme)
            {
                return BadRequest();
            }

            db.Entry(filmes).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Filmes
        [ResponseType(typeof(Filmes))]
        public IHttpActionResult PostFilmes(Filmes filmes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Filmes.Add(filmes);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = filmes.IdFilme }, filmes);
        }

        // DELETE: api/Filmes/5
        [ResponseType(typeof(Filmes))]
        public IHttpActionResult DeleteFilmes(int id)
        {
            Filmes filmes = db.Filmes.Find(id);
            if (filmes == null)
            {
                return NotFound();
            }

            db.Filmes.Remove(filmes);
            db.SaveChanges();

            return Ok(filmes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FilmesExists(int id)
        {
            return db.Filmes.Count(e => e.IdFilme == id) > 0;
        }
    }
}