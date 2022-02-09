using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Configurations
{
    class TaskConfiguration : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.Property(x => x.Id)
                .IsRequired()
                .HasDefaultValueSql("NEWID()");

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(x => x.Realization)
                .IsRequired()
                .HasColumnType("DATE");

            builder.Property(x => x.CreationDate)
                .IsRequired()
                .HasColumnType("DATETIME")
                .HasDefaultValueSql("GETDATE()");

            builder.Property(x => x.Priority)
                .IsRequired();

            builder
               .HasOne(x => x.Folder)
               .WithMany(x => x.Tasks)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
