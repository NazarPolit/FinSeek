using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class CreateCommentCommandHandler
		:IRequestHandler<CreateCommentCommand, int>
	{
		private readonly IUnitOfWork _unitOfWork;

		public CreateCommentCommandHandler(IUnitOfWork unitOfWork)
        {
			_unitOfWork = unitOfWork;
		}

		public async Task<int> Handle(CreateCommentCommand request,
			CancellationToken cancellationToken)
		{
			var comment = new Comment
			{
				Title = request.Title,
				Content = request.Content,
				CreatedOn = DateTime.Now,
			};

			comment.StockId = request.StockId;

			await _unitOfWork.Comments.AddAsync(comment);
			await _unitOfWork.CompleteAsync();

			return comment.Id;
		}
    }
}
