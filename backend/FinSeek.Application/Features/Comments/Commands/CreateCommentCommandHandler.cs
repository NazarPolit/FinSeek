using FinSeek.Application.DTOs.Comment;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CommentDto>
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly UserManager<AppUser> _userManager;
		private readonly IFMPService _fmpService;

		public CreateCommentCommandHandler(
			IUnitOfWork unitOfWork,
			UserManager<AppUser> userManager,
			IFMPService fmpService)
		{
			_unitOfWork = unitOfWork;
			_userManager = userManager;
			_fmpService = fmpService;
		}

		public async Task<CommentDto> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
		{
			var appUser = await _userManager.FindByNameAsync(request.Username);
			if (appUser == null) throw new Exception("User not found");

			var stock = await _unitOfWork.Stocks.GetBySymbolAsync(request.Symbol);

			if (stock == null)
			{
				stock = await _fmpService.FindStockBySymbolAsync(request.Symbol);
				if (stock == null) throw new Exception("Stock does not exist");

				await _unitOfWork.Stocks.AddAsync(stock);
				await _unitOfWork.CompleteAsync();
			}

			var comment = new Comment
			{
				Title = request.Title,
				Content = request.Content,
				CreatedOn = DateTime.Now,
				StockId = stock.Id,
				AppUserId = appUser.Id
			};

			await _unitOfWork.Comments.AddAsync(comment);
			await _unitOfWork.CompleteAsync();

			return new CommentDto
			{
				Id = comment.Id,
				Title = comment.Title,
				Content = comment.Content,
				CreatedOn = comment.CreatedOn,
				StockId = stock.Id,
				CreatedBy = appUser.UserName
			};
		}
	}
}