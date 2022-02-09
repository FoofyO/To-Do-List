using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IAccountService
    {
        Task<List<string>> Login(AccountCredentials accountCredentials, string Guid);

        Task<string> Register(AccountCredentials accountCredentials);
    }
}
