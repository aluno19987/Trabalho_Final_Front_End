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
    public class ImagensController : ApiController
    {
        private FilmesDb db = new FilmesDb();

        // GET: api/Imagens
        public IQueryable<Imagens> GetImagens()
        {
            return db.Imagens;
        }

        // GET: api/Imagens/5
        [ResponseType(typeof(Imagens))]
        public IHttpActionResult GetImagens(int id)
        {
            Imagens imagens = db.Imagens.Find(id);
            if (imagens == null)
            {
                return NotFound();
            }

            return Ok(imagens);
        }

        // PUT: api/Imagens/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImagens(int id, Imagens imagens)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imagens.IdImg)
            {
                return BadRequest();
            }

            db.Entry(imagens).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImagensExists(id))
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

        // POST: api/Imagens
        [ResponseType(typeof(Imagens))]
        public IHttpActionResult PostImagens(Imagens imagens)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Imagens.Add(imagens);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imagens.IdImg }, imagens);
        }

        // DELETE: api/Imagens/5
        [ResponseType(typeof(Imagens))]
        public IHttpActionResult DeleteImagens(int id)
        {
            Imagens imagens = db.Imagens.Find(id);
            if (imagens == null)
            {
                return NotFound();
            }

            db.Imagens.Remove(imagens);
            db.SaveChanges();

            return Ok(imagens);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImagensExists(int id)
        {
            return db.Imagens.Count(e => e.IdImg == id) > 0;
        }
    }
}