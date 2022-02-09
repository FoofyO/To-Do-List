using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Configurations
{
    class FolderConfiguration : IEntityTypeConfiguration<Folder>
    {
        public void Configure(EntityTypeBuilder<Folder> builder)
        {
            builder.Property(x => x.Id)
               .IsRequired()
               .HasDefaultValueSql("NEWID()");

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(x => x.Date)
                .IsRequired()
                .HasColumnType("DATETIME")
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
