using FinSeek.Application.Features.Stocks.Queries.GetStockList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Queries.GetCommentList
{
    public class CommentListVm
    {
        public IList<CommentLookupDto> Comments { get; set; }
    }
}
