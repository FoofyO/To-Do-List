using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<IdentityUser> signInManager;

        public AccountService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
        }

        public async Task<List<string>> Login(AccountCredentials accountCredentials, string Guid)
        {
            List<string> response = new List<string>();
            var user = await userManager.FindByEmailAsync(accountCredentials.Email);
            if (user == null)
            {
                response.Add("Email address that you entered is incorrect");
                return response;
            }
            if (!await userManager.CheckPasswordAsync(user, accountCredentials.Password))
            {
                response.Add("Password that you've entered is incorrect");
                return response;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Guid);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                Expires = DateTime.UtcNow.Add(TimeSpan.FromDays(2)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            response.Add("Ok");
            response.Add(tokenHandler.WriteToken(token));
            response.Add(user.UserName);
            response.Add(user.Id);
            return response;
        }

        public async Task<string> Register(AccountCredentials accountCredentials)
        {
            var isEmailTaken = await userManager.FindByEmailAsync(accountCredentials.Email);
            if (isEmailTaken == null)
            {
                var isUserNameTaken = await userManager.FindByNameAsync(accountCredentials.UserName);
                if (isUserNameTaken == null)
                {
                    var user = new IdentityUser
                    {
                        Email = accountCredentials.Email,
                        UserName = accountCredentials.UserName
                    };

                    var result = await userManager.CreateAsync(user, accountCredentials.Password);
                    if (!result.Succeeded)
                        return $"BadRequest:{result.Errors}";

                    return "Ok";
                }
                return $"BadRequest:Login is already taken";
            }
            return $"BadRequest:Email is already taken";
        }
    }
}
