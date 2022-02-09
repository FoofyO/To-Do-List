using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly string Guid;
        private readonly IAccountService accountService;

        public AccountController(IConfiguration configuration, IAccountService accountService)
        {
            this.Guid = configuration["Guid"];
            this.accountService = accountService;
        }

        [HttpGet]
        [Route("ping")]
        [Authorize]
        public IActionResult Ping()
        {
            return Ok("ping");
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login(AccountCredentials accountCredentials)
        {
            List<string> response = await accountService.Login(accountCredentials, this.Guid);
            if (response[0] == "Ok") return Ok(response);
            else return Unauthorized(response);
        }

        [HttpPost]
        [Route("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(AccountCredentials accountCredentials)
        {
            string response = await accountService.Register(accountCredentials);
            if (response == "Ok") return Ok();
            else return BadRequest(response.Split(":")[1]);
        }
    }
}
