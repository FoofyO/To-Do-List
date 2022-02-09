using Core.Base;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Repositories
{
    public interface IFolderRepository : IRepository<Folder>
    {
        IEnumerable<Folder> GetAllFoldersByUserId(string userId, string param = null, string sortBy = null);
    }
}
