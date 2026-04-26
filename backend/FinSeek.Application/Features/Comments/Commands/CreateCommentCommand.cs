using FinSeek.Application.DTOs.Comment;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class CreateCommentCommand : IRequest<CommentDto>
	{
		public string Title { get; set; } = string.Empty;
		public string Content { get; set; } = string.Empty;
		public string Symbol { get; set; } = string.Empty; 
		public string Username { get; set; } = string.Empty;
	}
}
