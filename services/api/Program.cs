using LedgerFlow.Api.Data;
using LedgerFlow.Api.Services;
using Microsoft.EntityFrameworkCore;
var builder=WebApplication.CreateBuilder(args);builder.Services.AddControllers();builder.Services.AddEndpointsApiExplorer();builder.Services.AddSwaggerGen();builder.Services.AddProblemDetails();builder.Services.AddHealthChecks().AddNpgSql(builder.Configuration.GetConnectionString("LedgerFlow")!);builder.Services.AddDbContext<AppDbContext>(o=>o.UseNpgsql(builder.Configuration.GetConnectionString("LedgerFlow")));builder.Services.AddScoped<ReconciliationService>();
var app=builder.Build();if(app.Environment.IsDevelopment()){app.UseSwagger();app.UseSwaggerUI();}app.UseExceptionHandler();using(var scope=app.Services.CreateScope()){var db=scope.ServiceProvider.GetRequiredService<AppDbContext>();await SeedData.EnsureSeededAsync(db);}app.MapControllers();app.MapHealthChecks("/health");app.Run();
public partial class Program{}
