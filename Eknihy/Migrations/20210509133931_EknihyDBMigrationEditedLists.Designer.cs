﻿// <auto-generated />
using System;
using Eknihy.Backend.Database_Entity.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Eknihy.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210509133931_EknihyDBMigrationEditedLists")]
    partial class EknihyDBMigrationEditedLists
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Author", b =>
                {
                    b.Property<int>("AuthorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AuthorName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AuthorId");

                    b.ToTable("Authors");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<bool>("Bestseller")
                        .HasColumnType("bit");

                    b.Property<string>("BookAdress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageAdress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("New")
                        .HasColumnType("bit");

                    b.Property<int?>("OrderOdrderId")
                        .HasColumnType("int");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("PublishingHouseId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("OrderOdrderId");

                    b.HasIndex("PublishingHouseId");

                    b.HasIndex("UserId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Order", b =>
                {
                    b.Property<int>("OdrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("OdrderId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.PublishingHouse", b =>
                {
                    b.Property<int>("PublishingHouseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PublishingHouseId");

                    b.ToTable("PublishingHouses");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Book", b =>
                {
                    b.HasOne("Eknihy.Backend.Database_Entity.record_classes.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Eknihy.Backend.Database_Entity.record_classes.Category", "Category")
                        .WithMany("Books")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Eknihy.Backend.Database_Entity.record_classes.Order", null)
                        .WithMany("Books")
                        .HasForeignKey("OrderOdrderId");

                    b.HasOne("Eknihy.Backend.Database_Entity.record_classes.PublishingHouse", "PublishingHouse")
                        .WithMany("Books")
                        .HasForeignKey("PublishingHouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Eknihy.Backend.Database_Entity.record_classes.User", null)
                        .WithMany("Books")
                        .HasForeignKey("UserId");

                    b.Navigation("Author");

                    b.Navigation("Category");

                    b.Navigation("PublishingHouse");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Order", b =>
                {
                    b.HasOne("Eknihy.Backend.Database_Entity.record_classes.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Author", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Category", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.Order", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.PublishingHouse", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("Eknihy.Backend.Database_Entity.record_classes.User", b =>
                {
                    b.Navigation("Books");
                });
#pragma warning restore 612, 618
        }
    }
}
