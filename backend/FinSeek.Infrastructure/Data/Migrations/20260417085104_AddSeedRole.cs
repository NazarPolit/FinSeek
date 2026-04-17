using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FinSeek.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1eda1af8-42aa-41f0-b491-95912d40e63a", null, "Admin", "ADMIN" },
                    { "a8f79552-5a89-47b9-913e-e6257f69c9c7", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1eda1af8-42aa-41f0-b491-95912d40e63a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8f79552-5a89-47b9-913e-e6257f69c9c7");
        }
    }
}
