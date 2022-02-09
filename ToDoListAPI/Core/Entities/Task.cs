using Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Task
    {
        public Task() {}

        public Task(string title, DateTime realization, string description, Priority priority) : this()
        {
            Title = title;
            Realization = realization;
            Description = description;
            Priority = priority;
            CreationDate = DateTime.Now;
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime Realization { get; set; }
        public DateTime? CreationDate { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public string FolderId { get; set; }
        public virtual Folder Folder { get; set; }
    }
}
