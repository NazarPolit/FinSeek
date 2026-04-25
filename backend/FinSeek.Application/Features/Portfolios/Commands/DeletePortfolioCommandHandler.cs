using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Portfolios.Commands
{
	public class DeletePortfolioCommandHandler : IRequestHandler<DeletePortfolioCommand, DeletePortfolioResult>
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly IUnitOfWork _unitOfWork;

		public DeletePortfolioCommandHandler(UserManager<AppUser> userManager, IUnitOfWork unitOfWork)
		{
			_userManager = userManager;
			_unitOfWork = unitOfWork;
		}

		public async Task<DeletePortfolioResult> Handle(DeletePortfolioCommand request, CancellationToken cancellationToken)
		{
			var appUser = await _userManager.FindByNameAsync(request.Username);

			if (appUser == null)
			{
				return new DeletePortfolioResult { IsSuccess = false, ErrorMessage = "User not found", StatusCode = 404 };
			}

			var portfolioModel = await _unitOfWork.Portfolios.GetPortfolioAsync(appUser.Id, request.Symbol);

			if (portfolioModel == null)
			{
				return new DeletePortfolioResult { IsSuccess = false, ErrorMessage = "Stock not found in your portfolio", StatusCode = 404 };
			}

			_unitOfWork.Portfolios.Delete(portfolioModel);

			var saved = await _unitOfWork.CompleteAsync();

			if (saved <= 0)
			{
				return new DeletePortfolioResult { IsSuccess = false, ErrorMessage = "Failed to delete portfolio", StatusCode = 500 };
			}

			return new DeletePortfolioResult { IsSuccess = true };
		}
	}
}
