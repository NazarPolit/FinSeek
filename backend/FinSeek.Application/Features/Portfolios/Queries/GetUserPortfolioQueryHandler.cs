using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Portfolios.Queries
{
	public class GetUserPortfolioQueryHandler : IRequestHandler<GetUserPortfolioQuery, List<Stock>>
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly IUnitOfWork _unitOfWork;

		public GetUserPortfolioQueryHandler(
			UserManager<AppUser> userManager,
			IUnitOfWork unitOfWork)
		{
			_userManager = userManager;
			_unitOfWork = unitOfWork;
		}

		public async Task<List<Stock>> Handle(GetUserPortfolioQuery request, CancellationToken cancellationToken)
		{
			var appUser = await _userManager.FindByNameAsync(request.Username);

			if (appUser == null)
			{
				return new List<Stock>();
			}

			var userPortfolio = await _unitOfWork.Portfolios.GetUserPortfolio(appUser);

			return userPortfolio;
		}
	}
}
