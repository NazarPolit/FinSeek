using FinSeek.Application.Common.Exceptions;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Commands
{
	public class DeleteStockCommandHandler
		: IRequestHandler<DeleteStockCommand, Unit>
	{
		private readonly IUnitOfWork _unitOfWork;

		public DeleteStockCommandHandler(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		public async Task<Unit> Handle(DeleteStockCommand request,
			CancellationToken cancellationToken)
		{
			var entity = await _unitOfWork.Stocks.GetByIdAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Stock), request.Id);
			}

			_unitOfWork.Stocks.Delete(entity);

			await _unitOfWork.CompleteAsync();

			return Unit.Value;
		}
	}
}
