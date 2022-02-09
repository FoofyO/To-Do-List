using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Folder
    {
        public Folder() => Tasks = new List<Task>();

        public Folder(string title) : this()
        {
            Title = title;
            Date = DateTime.Now;
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public DateTime? Date { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }

    }
}
