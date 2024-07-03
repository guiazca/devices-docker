using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevicesApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDispositivo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Dispositivos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IP",
                table: "Dispositivos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "LocalizacaoId",
                table: "Dispositivos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MacAddress",
                table: "Dispositivos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Dispositivos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Porta",
                table: "Dispositivos",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "URL",
                table: "Dispositivos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Dispositivos_LocalizacaoId",
                table: "Dispositivos",
                column: "LocalizacaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dispositivos_Localizacoes_LocalizacaoId",
                table: "Dispositivos",
                column: "LocalizacaoId",
                principalTable: "Localizacoes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dispositivos_Localizacoes_LocalizacaoId",
                table: "Dispositivos");

            migrationBuilder.DropIndex(
                name: "IX_Dispositivos_LocalizacaoId",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "IP",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "LocalizacaoId",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "MacAddress",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "Porta",
                table: "Dispositivos");

            migrationBuilder.DropColumn(
                name: "URL",
                table: "Dispositivos");
        }
    }
}
