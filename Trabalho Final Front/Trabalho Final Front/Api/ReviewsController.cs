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
    public class ReviewsController : ApiController
    {
        private FilmesDb db = new FilmesDb();

        // GET: api/Reviews
        public IQueryable<Reviews> GetReviews()
        {
            return db.Reviews;
        }

        // GET: api/Reviews/5
        [ResponseType(typeof(Reviews))]
        public IHttpActionResult GetReviews(int id)
        {
            Reviews reviews = db.Reviews.Find(id);
            if (reviews == null)
            {
                return NotFound();
            }

            return Ok(reviews);
        }

        // PUT: api/Reviews/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReviews(int id, Reviews reviews)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reviews.IdReview)
            {
                return BadRequest();
            }

            db.Entry(reviews).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewsExists(id))
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

        // POST: api/Reviews
        [ResponseType(typeof(Reviews))]
        public IHttpActionResult PostReviews(Reviews reviews)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Reviews.Add(reviews);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = reviews.IdReview }, reviews);
        }

        // DELETE: api/Reviews/5
        [ResponseType(typeof(Reviews))]
        public IHttpActionResult DeleteReviews(int id)
        {
            Reviews reviews = db.Reviews.Find(id);
            if (reviews == null)
            {
                return NotFound();
            }

            db.Reviews.Remove(reviews);
            db.SaveChanges();

            return Ok(reviews);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReviewsExists(int id)
        {
            return db.Reviews.Count(e => e.IdReview == id) > 0;
        }
    }
}