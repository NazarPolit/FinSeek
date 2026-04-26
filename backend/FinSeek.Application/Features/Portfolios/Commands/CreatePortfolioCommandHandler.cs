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
    public class AddPortfolioCommandHandler : IRequestHandler<CreatePortfolioCommand, AddPortfolioResult>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
		private readonly IFMPService _fmpService;

		public AddPortfolioCommandHandler(
			UserManager<AppUser> userManager, 
			IUnitOfWork unitOfWork,
			IFMPService fmpService)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
			_fmpService = fmpService;
		}

        public async Task<AddPortfolioResult> Handle(CreatePortfolioCommand request, CancellationToken cancellationToken)
        {
			var appUser = await _userManager.FindByNameAsync(request.Username);
			if (appUser == null) return new AddPortfolioResult { IsSuccess = false, ErrorMessage = "User not found" };

			var stock = await _unitOfWork.Stocks.GetBySymbolAsync(request.Symbol);

			if (stock == null)
			{
				stock = await _fmpService.FindStockBySymbolAsync(request.Symbol);

				if (stock == null)
				{
					return new AddPortfolioResult { IsSuccess = false, ErrorMessage = "Stock does not exist" };
				}

				await _unitOfWork.Stocks.AddAsync(stock);
				await _unitOfWork.CompleteAsync();
			}

			var userPortfolio = await _unitOfWork.Portfolios.GetUserPortfolio(appUser);

			if (userPortfolio.Any(e => e.Symbol.ToLower() == request.Symbol.ToLower()))
			{
				return new AddPortfolioResult { IsSuccess = false, ErrorMessage = "Cannot add same stock to portfolio" };
			}

			var portfolioModel = new Portfolio
			{
				StockId = stock.Id,
				AppUserId = appUser.Id
			};

			await _unitOfWork.Portfolios.AddAsync(portfolioModel);
			var saved = await _unitOfWork.CompleteAsync();

			if (saved <= 0) return new AddPortfolioResult { IsSuccess = false, ErrorMessage = "Could not create portfolio", StatusCode = 500 };

			return new AddPortfolioResult { IsSuccess = true };
		}
	}
}
