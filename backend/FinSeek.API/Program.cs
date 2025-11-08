using FinSeek.Infrastructure;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Interfaces;
using FinSeek.Domain.Interfaces;
using FinSeek.Application;
using FinSeek.Infrastructure.Data;
using FinSeek.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using FinSeek.API.Middleware;

namespace FinSeek.API
{
    public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddControllers();

			builder.Services.AddAutoMapper(config =>
			{
				config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
				config.AddProfile(new AssemblyMappingProfile(typeof(IApplicationDbContext).Assembly));
			});

			builder.Services.AddApplication();
			builder.Services.AddInfrastructure(builder.Configuration);

			builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

			builder.Services.AddAuthorization();
			builder.Services.AddHttpContextAccessor();

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowAll", policy =>
				{
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
			});

			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseCustomExceptionHandler();

			app.UseHttpsRedirection();
			app.UseCors("AllowAll");

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
