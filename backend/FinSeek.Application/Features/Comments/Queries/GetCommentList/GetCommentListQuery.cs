using FinSeek.Domain.Helpers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentList
{
    public class GetCommentListQuery : IRequest<CommentListVm>
    {
		public CommentQueryObject QueryObject { get; set; }

		public GetCommentListQuery(CommentQueryObject queryObject)
		{
			QueryObject = queryObject;
		}
	}
}
