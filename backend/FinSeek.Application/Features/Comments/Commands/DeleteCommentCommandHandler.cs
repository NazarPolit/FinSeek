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
	public class DeleteCommentCommandHandler
	: IRequestHandler<DeleteCommentCommand, Unit>
	{
		private readonly IUnitOfWork _unitOfWork;

		public DeleteCommentCommandHandler(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

        public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = await _unitOfWork.Comments.GetByIdWithUserAsync(request.Id);

            if (comment == null)
                throw new NotFoundException(nameof(Comment), request.Id);

            if (comment.AppUser.UserName != request.Username)
                throw new UnauthorizedAccessException("You can only delete your own comments.");

            _unitOfWork.Comments.Delete(comment);
            await _unitOfWork.CompleteAsync();

            return Unit.Value;
        }
    }
}
