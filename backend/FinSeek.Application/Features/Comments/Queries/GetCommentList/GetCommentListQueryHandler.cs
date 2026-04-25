using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinSeek.Application.Features.Comments.Queries.GetCommentList;
using FinSeek.Domain.Interfaces;
using MediatR;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentList
{ 
    public class GetCommentListQueryHandler
        : IRequestHandler<GetCommentListQuery, CommentListVm>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCommentListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

		public async Task<CommentListVm> Handle(GetCommentListQuery request,
			CancellationToken cancellationToken)
		{
			var CommentsQuery = await _unitOfWork.Comments.GetAllAsync();

			var CommentQueryDto = CommentsQuery
				.AsQueryable()
				.ProjectTo<CommentLookupDto>(_mapper.ConfigurationProvider)
				.ToList();

			return new CommentListVm { Comments = CommentQueryDto };
		}
	}
}
