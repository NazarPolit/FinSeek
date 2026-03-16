using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentQuery
{
    public class GetCommentQuery :IRequest<CommentVm>
    {
        public int Id { get; set; }
    }
}
