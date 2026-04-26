using AutoMapper;
using FinSeek.Domain.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentList
{
	public class GetCommentListQueryHandler : IRequestHandler<GetCommentListQuery, CommentListVm>
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public GetCommentListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<CommentListVm> Handle(GetCommentListQuery request, CancellationToken cancellationToken)
		{
			var commentsQuery = await _unitOfWork.Comments.GetAllWithQueryAsync(request.QueryObject);

			var commentQueryDto = _mapper.Map<List<CommentLookupDto>>(commentsQuery);

			return new CommentListVm { Comments = commentQueryDto };
		}
	}
}