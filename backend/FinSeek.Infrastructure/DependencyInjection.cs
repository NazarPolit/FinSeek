using FinSeek.Application.Interfaces;
using FinSeek.Domain.Entities;
using FinSeek.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection
			services, IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("DefaultConnection");

			services.AddDbContext<ApplicationDbContext>(options =>
			{
				options.UseSqlServer(connectionString);
			});

			services.AddIdentity<AppUser, IdentityRole>(options =>
			{
				options.Password.RequireDigit = true;
				options.Password.RequireLowercase = true;
				options.Password.RequireUppercase = true;
				options.Password.RequireNonAlphanumeric = true;
				options.Password.RequiredLength = 12;
			})
			.AddEntityFrameworkStores<ApplicationDbContext>();


			services.AddAuthentication(options =>
			{
				options.DefaultChallengeScheme =
				options.DefaultAuthenticateScheme =
				options.DefaultForbidScheme =
				options.DefaultScheme =
				options.DefaultSignInScheme =
				options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidIssuer = configuration["JWT:Issuer"],
					ValidateAudience = true,
					ValidAudience = configuration["JWT:Audience"],
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(
						System.Text.Encoding.UTF8.GetBytes(configuration["JWT:SigningKey"]))
				};
			});

			services.AddScoped<IApplicationDbContext>(provider =>
				provider.GetService<ApplicationDbContext>());

			return services;
		}
	}
}
