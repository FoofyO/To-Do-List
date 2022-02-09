using Core.Entities;
using Core.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class FolderController : ControllerBase
    {
        private readonly IFolderRepository folderRepository;

        public FolderController(IFolderRepository folderRepository) => this.folderRepository = folderRepository;

        [HttpGet]
        [Route("ping")]
        [Authorize]
        public IActionResult Ping()
        {
            return Ok("ping");
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Folder>> GetAll(string userId, string param = null, string sortBy = null)
        {
            return Ok(folderRepository.GetAllFoldersByUserId(userId, param, sortBy));
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Folder> GetById(string id)
        {
            try
            {
                return Ok(folderRepository.Get(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Folder> Create(Folder folder)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                folder.Id = null;
                folder.Date = null;
                folderRepository.Create(folder);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Created($"/api/v1/folders/{folder.Id}", folder);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Folder> Update(string id, Folder folder)
        {
            if (id == null || folder == null || id != folder.Id)
                return BadRequest();
            try
            {
                folderRepository.Update(folder);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return Ok(folder);
        }

        [HttpPatch]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Folder> Patch(string id, JsonPatchDocument<Folder> folderPatch) 
        {
            if (id == null || folderPatch == null)
                return BadRequest();

            try
            {
                var folder = folderRepository.Get(id);
                folderPatch.ApplyTo(folder);
                folderRepository.Update(folder);

                return Ok(folder);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult Delete(string id)
        {
            if (id == null)
                return BadRequest();

            try
            {
                var folder = folderRepository.Get(id);
                folderRepository.Delete(folder);
            }
            catch (Exception)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpHead]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult Head()
        {
            return Ok();
        }

        [HttpOptions]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string> Options()
        {
            return Ok("x2 GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
        }
    }
}
