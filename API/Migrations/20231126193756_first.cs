using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    ClienteId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Telefone = table.Column<string>(type: "TEXT", nullable: false),
                    CPF = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.ClienteId);
                });

            migrationBuilder.CreateTable(
                name: "Quartos",
                columns: table => new
                {
                    QuartoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NumeroQuarto = table.Column<int>(type: "INTEGER", nullable: false),
                    TipoQuarto = table.Column<string>(type: "TEXT", nullable: true),
                    Diaria = table.Column<double>(type: "REAL", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quartos", x => x.QuartoId);
                });

            migrationBuilder.CreateTable(
                name: "Alugueis",
                columns: table => new
                {
                    AluguelId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClienteId = table.Column<int>(type: "INTEGER", nullable: false),
                    QuartoId = table.Column<int>(type: "INTEGER", nullable: false),
                    Dias = table.Column<int>(type: "INTEGER", nullable: false),
                    ValorTotal = table.Column<double>(type: "REAL", nullable: false),
                    DataEntrada = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alugueis", x => x.AluguelId);
                    table.ForeignKey(
                        name: "FK_Alugueis_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "ClienteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Alugueis_Quartos_QuartoId",
                        column: x => x.QuartoId,
                        principalTable: "Quartos",
                        principalColumn: "QuartoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alugueis_ClienteId",
                table: "Alugueis",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Alugueis_QuartoId",
                table: "Alugueis",
                column: "QuartoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alugueis");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Quartos");
        }
    }
}
