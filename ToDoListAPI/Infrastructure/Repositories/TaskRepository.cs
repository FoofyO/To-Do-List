using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ToDoListDBContext context;

        public TaskRepository(ToDoListDBContext context) => this.context = context;
        public void Create(Task item)
        {
            context.Tasks.Add(item);
            context.SaveChanges();
        }
        public void Update(Task item)
        {
            context.Tasks.Update(item);
            context.SaveChanges();
        }
        public void Delete(Task item)
        {
            context.Tasks.Remove(item);
            context.SaveChanges();
        }

        public Task Get(string id)
        {
            var item = context.Tasks.Find(id);
            if (item == null) throw new Exception("Not found!");
            return item;
        }

        public IEnumerable<Task> GetAll() 
        { 
            return context.Tasks.ToList(); 
        }

        public IEnumerable<Task> GetAllTasksByFolderId(string folderId)
        {
            return context.Tasks.Where(x => x.FolderId == folderId).ToList();
        }
    }
}
