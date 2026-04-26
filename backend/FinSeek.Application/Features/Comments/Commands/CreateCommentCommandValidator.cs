using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
	{
		public CreateCommentCommandValidator()
		{
			RuleFor(x => x.Title)
				.NotEmpty().WithMessage("Title is required")
				.MaximumLength(100);

			RuleFor(x => x.Content)
				.NotEmpty().WithMessage("Content is required");

			RuleFor(x => x.Symbol).NotEmpty();
		}
	}
}
