using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Repositories
{
    public class FolderRepository : IFolderRepository
    {
        private readonly ToDoListDBContext context;

        public FolderRepository(ToDoListDBContext context) => this.context = context;
        
        public void Create(Folder item)
        {
            context.Folders.Add(item);
            context.SaveChanges();
        }

        public void Update(Folder item)
        {
            context.Folders.Update(item);
            context.SaveChanges();
        }

        public void Delete(Folder item)
        {
            context.Folders.Remove(item);
            context.SaveChanges();
        }

        public Folder Get(string id)
        {
            var item = context.Folders.Find(id);
            if (item == null) throw new Exception("Not found!");
            return item;
        }

        public IEnumerable<Folder> GetAll()
        {
            return context.Folders.ToList();
        }

        public IEnumerable<Folder> GetAllFoldersByUserId(string userId, string param = null, string sortBy = null)
        {
            if(param == null || sortBy == null) return context.Folders.Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToList();
            else
            {
                if (sortBy == "ASC")
                {
                    if (param == "Title") return context.Folders.Where(x => x.UserId == userId).OrderBy(x => x.Title).ToList();
                    else return context.Folders.Where(x => x.UserId == userId).OrderBy(x => x.Title).ToList();
                }
                else
                {
                    if (param == "Date") return context.Folders.Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToList();
                    else return context.Folders.Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToList();
                }
            }
        }

    }
}
