using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, int>
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly UserManager<AppUser> _userManager;

		public CreateCommentCommandHandler(
			IUnitOfWork unitOfWork,
			UserManager<AppUser> userManager)
		{
			_unitOfWork = unitOfWork;
			_userManager = userManager;
		}

		public async Task<int> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
		{
			var appUser = await _userManager.FindByNameAsync(request.Username);

			if (appUser == null)
			{
				throw new Exception("User not found");
			}

			var comment = new Comment
			{
				Title = request.Title,
				Content = request.Content,
				CreatedOn = DateTime.Now,
				StockId = request.StockId,
				AppUserId = appUser.Id
			};

			await _unitOfWork.Comments.AddAsync(comment);
			await _unitOfWork.CompleteAsync();

			return comment.Id;
		}
	}
}