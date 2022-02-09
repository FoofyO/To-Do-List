using Core.Entities;
using Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class ToDoListDBContext : IdentityDbContext<IdentityUser>
    {
        public ToDoListDBContext(DbContextOptions<ToDoListDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration<Task>(new TaskConfiguration());
            modelBuilder.ApplyConfiguration<Folder>(new FolderConfiguration());
            modelBuilder.ApplyConfiguration<IdentityUser>(new UserConfiguration());
            
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<Folder> Folders { get; set; }
    }
}
