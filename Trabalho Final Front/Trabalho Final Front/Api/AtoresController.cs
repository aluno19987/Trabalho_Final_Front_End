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
    public class AtoresController : ApiController
    {
        private FilmesDb db = new FilmesDb();

        // GET: api/Atores
        public IQueryable<Atores> GetAtores()
        {
            return db.Atores;
        }

        // GET: api/Atores/5
        [ResponseType(typeof(Atores))]
        public IHttpActionResult GetAtores(int id)
        {
            Atores atores = db.Atores.Find(id);
            if (atores == null)
            {
                return NotFound();
            }

            var resultado = new
            {
                atores.IdAtor,
                atores.Imagem,
                atores.Nome,
                atores.DataNascimento
            };

            return Ok(atores);
        }

        // PUT: api/Atores/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAtores(int id, Atores atores)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != atores.IdAtor)
            {
                return BadRequest();
            }

            db.Entry(atores).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AtoresExists(id))
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

        // POST: api/Atores
        [ResponseType(typeof(Atores))]
        public IHttpActionResult PostAtores(Atores atores)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Atores.Add(atores);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = atores.IdAtor }, atores);
        }

        // DELETE: api/Atores/5
        [ResponseType(typeof(Atores))]
        public IHttpActionResult DeleteAtores(int id)
        {
            Atores atores = db.Atores.Find(id);
            if (atores == null)
            {
                return NotFound();
            }

            db.Atores.Remove(atores);
            db.SaveChanges();

            return Ok(atores);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AtoresExists(int id)
        {
            return db.Atores.Count(e => e.IdAtor == id) > 0;
        }
    }
}