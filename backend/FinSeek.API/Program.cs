using FinSeek.Infrastructure;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Interfaces;
using FinSeek.Domain.Interfaces;
using FinSeek.Application;
using FinSeek.Infrastructure.Data.Repositories;
using System.Reflection;
using FinSeek.API.Middleware;
using FinSeek.Application.Common.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using FluentValidation;
using FinSeek.Infrastructure.Services;
using Microsoft.OpenApi.Models;

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
			builder.Services.AddScoped<ITokenService, TokenService>();

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

			builder.Services.AddSwaggerGen(option =>
			{
				option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
				option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					In = ParameterLocation.Header,
					Description = "Please enter a valid token",
					Name = "Authorization",
					Type = SecuritySchemeType.Http,
					BearerFormat = "JWT",
					Scheme = "Bearer"
				});
				option.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type=ReferenceType.SecurityScheme,
								Id="Bearer"
							}
						},
						new string[]{}
					}
				});
			});

			builder.Services.AddControllers()
			.AddNewtonsoftJson(options =>
			{
				options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
			});

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseExceptionHandler(config =>
			{
				config.Run(async context =>
				{
					var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;

					switch (exception)
					{
						case ValidationException validationException:
							context.Response.StatusCode = 400;
							await context.Response.WriteAsJsonAsync(new
							{
								errors = validationException.Errors.Select(e => e.ErrorMessage)
							});
							break;

						case NotFoundException notFoundException:
							context.Response.StatusCode = 404;
							await context.Response.WriteAsJsonAsync(new
							{
								error = notFoundException.Message
							});
							break;

						default:
							context.Response.StatusCode = 500;
							await context.Response.WriteAsJsonAsync(new
							{
								error = exception?.Message
							});
							break;
					}
				});
			});
			app.UseHttpsRedirection();
			app.UseCors("AllowAll");

			app.UseAuthentication();
			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
