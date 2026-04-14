using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class UpdateCommentCommandValidator : AbstractValidator<UpdateCommentCommand>
	{
		public UpdateCommentCommandValidator()
		{
			RuleFor(x => x.Title)
				.NotEmpty().WithMessage("Title is required.")
				.MaximumLength(255).WithMessage("Title must not exceed 255 characters.");

			RuleFor(x => x.Content)
				.NotEmpty().WithMessage("Content is required.")
				.MaximumLength(2000).WithMessage("Content must not exceed 2000 characters.");
		}
	}
}
