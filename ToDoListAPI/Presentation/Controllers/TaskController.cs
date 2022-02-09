using Core.Entities;
using Core.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository taskRepository;

        public TaskController(ITaskRepository taskRepository) => this.taskRepository = taskRepository;

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
        public ActionResult<List<Task>> GetAll(string folderId)
        {
            return Ok(taskRepository.GetAllTasksByFolderId(folderId));
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Task> GetById(string id)
        {
            try
            {
                return Ok(taskRepository.Get(id));
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
        public ActionResult<Task> Create(Task task)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                task.Id = null;
                task.CreationDate = null;
                taskRepository.Create(task);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Created($"/api/v1/tasks/{task.Id}", task);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Folder> Update(string id, Task task)
        {
            if (id == null || task == null || id != task.Id)
                return BadRequest();
            try
            {
                taskRepository.Update(task);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return Ok(task);
        }

        [HttpPatch]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Folder> Patch(string id, JsonPatchDocument<Task> taskPatch)
        {
            if (id == null || taskPatch == null)
                return BadRequest();

            try
            {
                var task = taskRepository.Get(id);
                taskPatch.ApplyTo(task);
                taskRepository.Update(task);

                return Ok(task);
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
                var task = taskRepository.Get(id);
                taskRepository.Delete(task);
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
