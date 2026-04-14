using FinSeek.Application.Common.Exceptions;
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
	public class UpdateCommentCommandHandler
		:IRequestHandler<UpdateCommentCommand, Unit>
	{
		private readonly IUnitOfWork _unitOfWork;

		public UpdateCommentCommandHandler(IUnitOfWork unitOfWork) 
		{
			_unitOfWork = unitOfWork;
		}

		public async Task<Unit> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
		{
			var entity = await _unitOfWork.Comments.GetByIdAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Stock), request.Id);
			}

			entity.Title = request.Title;
			entity.Content = request.Content;

			await _unitOfWork.CompleteAsync();

			return Unit.Value;
		}
	}
}
