using AutoMapper;
using FinSeek.Application.Common.Exceptions;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentQuery
{
    public class GetCommentQueryHandler
        : IRequestHandler<GetCommentQuery, CommentVm>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCommentQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

		public async Task<CommentVm> Handle(GetCommentQuery request, CancellationToken cancellationToken)
		{
			var entity = await _unitOfWork.Comments.GetByIdWithUserAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Comment), request.Id);
			}

			return _mapper.Map<CommentVm>(entity);
		}
	}
}
