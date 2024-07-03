using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DevicesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddModelo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dispositivos_Marcas_MarcaId",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "Modelo",
                table: "Dispositivos");

            migrationBuilder.AlterColumn<int>(
                name: "MarcaId",
                table: "Dispositivos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "ModeloId",
                table: "Dispositivos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Modelos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    MarcaId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modelos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modelos_Marcas_MarcaId",
                        column: x => x.MarcaId,
                        principalTable: "Marcas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dispositivos_ModeloId",
                table: "Dispositivos",
                column: "ModeloId");

            migrationBuilder.CreateIndex(
                name: "IX_Modelos_MarcaId",
                table: "Modelos",
                column: "MarcaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dispositivos_Marcas_MarcaId",
                table: "Dispositivos",
                column: "MarcaId",
                principalTable: "Marcas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dispositivos_Modelos_ModeloId",
                table: "Dispositivos",
                column: "ModeloId",
                principalTable: "Modelos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dispositivos_Marcas_MarcaId",
                table: "Dispositivos");

            migrationBuilder.DropForeignKey(
                name: "FK_Dispositivos_Modelos_ModeloId",
                table: "Dispositivos");

            migrationBuilder.DropTable(
                name: "Modelos");

            migrationBuilder.DropIndex(
                name: "IX_Dispositivos_ModeloId",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "ModeloId",
                table: "Dispositivos");

            migrationBuilder.AlterColumn<int>(
                name: "MarcaId",
                table: "Dispositivos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Modelo",
                table: "Dispositivos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Dispositivos_Marcas_MarcaId",
                table: "Dispositivos",
                column: "MarcaId",
                principalTable: "Marcas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
