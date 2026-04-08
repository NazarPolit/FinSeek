using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class DeleteCommentCommand : IRequest<Unit>
	{
		public int Id { get; set; }
	}
}
