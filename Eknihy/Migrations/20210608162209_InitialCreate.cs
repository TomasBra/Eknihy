using Microsoft.EntityFrameworkCore.Migrations;

namespace Eknihy.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Orders_OrderOdrderId",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "OdrderId",
                table: "Orders",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "OrderOdrderId",
                table: "Books",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Books_OrderOdrderId",
                table: "Books",
                newName: "IX_Books_OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Orders_OrderId",
                table: "Books",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Orders_OrderId",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Orders",
                newName: "OdrderId");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Books",
                newName: "OrderOdrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Books_OrderId",
                table: "Books",
                newName: "IX_Books_OrderOdrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Orders_OrderOdrderId",
                table: "Books",
                column: "OrderOdrderId",
                principalTable: "Orders",
                principalColumn: "OdrderId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
